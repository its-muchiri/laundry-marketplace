-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'rider', 'admin');
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'assigned', 'pickup_enroute', 'pickup_arrived', 
  'pickup_completed', 'return_enroute', 'return_arrived', 'completed', 'cancelled'
);
CREATE TYPE leg_type AS ENUM ('pickup', 'return');
CREATE TYPE leg_status AS ENUM ('pending', 'assigned', 'enroute', 'arrived', 'completed', 'failed');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded', 'held');
CREATE TYPE payment_type AS ENUM ('mpesa_stk', 'card', 'cash', 'wallet');
CREATE TYPE ledger_type AS ENUM ('charge', 'hold', 'refund', 'commission', 'payout', 'fee');
CREATE TYPE provider_tier AS ENUM ('bronze', 'silver', 'gold');
CREATE TYPE rider_vehicle AS ENUM ('boda', 'car', 'tuktuk');
CREATE TYPE document_type AS ENUM ('national_id', 'passport', 'drivers_license', 'vehicle_registration', 'insurance', 'profile_photo', 'other');

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  avatar_url VARCHAR(500),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Create addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(50) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  landmark VARCHAR(500) NOT NULL,
  formatted_address VARCHAR(500),
  county VARCHAR(100),
  sub_county VARCHAR(100),
  ward VARCHAR(100),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT AddGeometryColumn('addresses', 'location', 4326, 'POINT', 2);
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_location ON addresses USING GIST(location);

-- Create providers table
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(200) NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  service_radius_km INTEGER NOT NULL DEFAULT 5,
  capacity_kg_per_day INTEGER NOT NULL DEFAULT 100,
  current_load_kg INTEGER DEFAULT 0,
  tier provider_tier DEFAULT 'bronze',
  commission_rate DECIMAL(5,4) DEFAULT 0.15,
  opening_time TIME NOT NULL DEFAULT '08:00',
  closing_time TIME NOT NULL DEFAULT '20:00',
  is_open BOOLEAN DEFAULT TRUE,
  is_approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id),
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT AddGeometryColumn('providers', 'location', 4326, 'POINT', 2);
CREATE INDEX idx_providers_location ON providers USING GIST(location);
CREATE INDEX idx_providers_tier ON providers(tier);
CREATE INDEX idx_providers_approved ON providers(is_approved);

-- Create service_items table
CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_per_kg_cents INTEGER NOT NULL,
  estimated_turnaround_hours INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_service_items_provider_id ON service_items(provider_id);

-- Create riders table
CREATE TABLE riders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type rider_vehicle NOT NULL DEFAULT 'boda',
  license_plate VARCHAR(20),
  vehicle_color VARCHAR(50),
  national_id VARCHAR(20),
  drivers_license VARCHAR(50),
  insurance_number VARCHAR(50),
  payout_phone VARCHAR(20),
  payout_provider VARCHAR(20) DEFAULT 'mpesa',
  is_available BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id),
  current_latitude DOUBLE PRECISION,
  current_longitude DOUBLE PRECISION,
  last_location_update TIMESTAMPTZ,
  rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT AddGeometryColumn('riders', 'current_location', 4326, 'POINT', 2);
CREATE INDEX idx_riders_available ON riders(is_available, is_approved);
CREATE INDEX idx_riders_location ON riders USING GIST(current_location);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES users(id),
  provider_id UUID REFERENCES providers(id),
  rider_id UUID REFERENCES riders(id),
  status order_status NOT NULL DEFAULT 'pending',
  service_type VARCHAR(100) NOT NULL,
  estimated_weight_kg DECIMAL(6,2),
  actual_weight_kg DECIMAL(6,2),
  price_per_kg_cents INTEGER NOT NULL,
  pickup_fee_cents INTEGER NOT NULL DEFAULT 0,
  return_fee_cents INTEGER NOT NULL DEFAULT 0,
  service_fee_cents INTEGER NOT NULL DEFAULT 0,
  platform_fee_cents INTEGER NOT NULL DEFAULT 0,
  provider_earnings_cents INTEGER NOT NULL DEFAULT 0,
  rider_earnings_cents INTEGER NOT NULL DEFAULT 0,
  total_amount_cents INTEGER NOT NULL,
  pickup_address_id UUID REFERENCES addresses(id),
  dropoff_address_id UUID REFERENCES addresses(id),
  pickup_window_start TIMESTAMP,
  pickup_window_end TIMESTAMP,
  dropoff_window_start TIMESTAMP,
  dropoff_window_end TIMESTAMP,
  estimated_pickup_at TIMESTAMP,
  estimated_return_at TIMESTAMP,
  actual_pickup_at TIMESTAMP,
  actual_return_at TIMESTAMP,
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES users(id),
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_provider_id ON orders(provider_id);
CREATE INDEX idx_orders_rider_id ON orders(rider_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Create order_legs table
CREATE TABLE order_legs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  leg_type leg_type NOT NULL,
  status leg_status NOT NULL DEFAULT 'pending',
  rider_id UUID REFERENCES riders(id),
  provider_id UUID REFERENCES providers(id),
  distance_meters INTEGER,
  duration_seconds INTEGER,
  fee_cents INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP,
  arrived_at TIMESTAMP,
  completed_at TIMESTAMP,
  started_location_lat DOUBLE PRECISION,
  started_location_lng DOUBLE PRECISION,
  arrived_location_lat DOUBLE PRECISION,
  arrived_location_lng DOUBLE PRECISION,
  completed_location_lat DOUBLE PRECISION,
  completed_location_lng DOUBLE PRECISION,
  photos JSONB DEFAULT '[]',
  item_count INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_legs_order_id ON order_legs(order_id);
CREATE INDEX idx_order_legs_rider_id ON order_legs(rider_id);
CREATE INDEX idx_order_legs_status ON order_legs(status);

-- Create order_events table
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id),
  actor_role user_role,
  event_type VARCHAR(50) NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

SELECT AddGeometryColumn('order_events', 'location', 4326, 'POINT', 2);
CREATE INDEX idx_order_events_order_id ON order_events(order_id);
CREATE INDEX idx_order_events_created_at ON order_events(created_at);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_item_id UUID REFERENCES service_items(id),
  name VARCHAR(200) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  weight_kg DECIMAL(6,2),
  price_cents INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'KES',
  type payment_type NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  provider_reference VARCHAR(100),
  provider_response JSONB,
  callback_url VARCHAR(500),
  failure_reason TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_provider_reference ON payments(provider_reference);

-- Create ledger_entries table
CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  payment_id UUID REFERENCES payments(id),
  type ledger_type NOT NULL,
  amount_cents INTEGER NOT NULL,
  balance_after_cents INTEGER NOT NULL,
  description TEXT,
  reference VARCHAR(100),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ledger_entries_user_id ON ledger_entries(user_id);
CREATE INDEX idx_ledger_entries_order_id ON ledger_entries(order_id);
CREATE INDEX idx_ledger_entries_created_at ON ledger_entries(created_at);

-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type document_type NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(255),
  mime_type VARCHAR(100),
  file_size_bytes INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_status ON documents(status);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  sent_via VARCHAR(20)[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Create admin settings table
CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_log table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_admin_id ON audit_log(admin_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
  ('provider_commission_rate', '0.15', 'Provider commission rate (15% for Bronze)'),
  ('delivery_base_fee_cents', '10000', 'Base delivery fee per leg (KES 100)'),
  ('delivery_per_km_rate_cents', '5000', 'Per km rate (KES 50)'),
  ('peak_surcharge_cents', '5000', 'Peak hour surcharge (KES 50)'),
  ('platform_share_min', '0.10', 'Platform minimum share of delivery fee (10%)'),
  ('platform_share_max', '0.20', 'Platform maximum share of delivery fee (20%)'),
  ('service_fee_cents', '2000', 'Service fee per order (KES 20)'),
  ('charge_service_fee', 'true', 'Whether to charge service fee'),
  ('price_variance_threshold', '0.15', 'Price variance threshold (15%)'),
  ('dispatch_offer_timeout_ms', '30000', 'Dispatch offer timeout (30 seconds)'),
  ('dispatch_max_misses_before_widen', '3', 'Max misses before widening radius'),
  ('dispatch_radius_widen_factor', '1.5', 'Radius widen factor'),
  ('dispute_window_hours', '24', 'Dispute window in hours'),
  ('compensation_cap_per_item_cents', '500000', 'Compensation cap per item (KES 5,000)'),
  ('compensation_cap_per_order_cents', '2000000', 'Compensation cap per order (KES 20,000)'),
  ('otp_expiry_minutes', '5', 'OTP expiry in minutes'),
  ('otp_length', '6', 'OTP length'),
  ('otp_rate_limit_per_hour', '3', 'OTP rate limit per hour')
ON CONFLICT (key) DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_items_updated_at BEFORE UPDATE ON service_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_riders_updated_at BEFORE UPDATE ON riders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_legs_updated_at BEFORE UPDATE ON order_legs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();