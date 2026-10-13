export const MONEY_PRECISION = 100; // KES cents

export const ORDER_STATE_TRANSITIONS: Record<string, string[]> = {
  placed: ['accepted', 'cancelled'],
  accepted: ['rider_assigned', 'cancelled'],
  rider_assigned: ['picked_up', 'cancelled'],
  picked_up: ['at_provider', 'cancelled'],
  at_provider: ['weighed', 'cancelled'],
  weighed: ['processing', 'cancelled', 'disputed'],
  processing: ['ready', 'cancelled', 'disputed'],
  ready: ['out_for_delivery', 'cancelled', 'disputed'],
  out_for_delivery: ['delivered', 'cancelled', 'disputed'],
  delivered: ['completed', 'disputed'],
  completed: [],
  cancelled: [],
  disputed: ['completed', 'cancelled'],
};

export const ALLOWED_ACTORS: Record<string, string[]> = {
  placed: ['customer'],
  accepted: ['provider'],
  rider_assigned: ['system'],
  picked_up: ['rider'],
  at_provider: ['rider'],
  weighed: ['provider'],
  processing: ['provider'],
  ready: ['provider'],
  out_for_delivery: ['rider'],
  delivered: ['rider'],
  completed: ['system'],
  cancelled: ['customer', 'provider', 'rider', 'admin'],
  disputed: ['customer', 'provider', 'rider', 'admin'],
};

export const PRICE_VARIANCE_THRESHOLD = 0.15; // 15%

export const PROVIDER_COMMISSION_RATE = 0.15; // 15% for Bronze

export const DELIVERY_FEE_PLATFORM_SHARE_MIN = 0.10; // 10%
export const DELIVERY_FEE_PLATFORM_SHARE_MAX = 0.20; // 20%

export const DEFAULT_DELIVERY_BASE_FEE = 10000; // KES 100.00 in cents
export const DEFAULT_DELIVERY_PER_KM_RATE = 5000; // KES 50.00 per km in cents
export const DEFAULT_PEAK_SURCHARGE = 5000; // KES 50.00 in cents

export const DEFAULT_SERVICE_FEE = 2000; // KES 20.00 in cents

export const DISPATCH_OFFER_TIMEOUT_MS = 30000; // 30 seconds
export const DISPATCH_MAX_MISSES_BEFORE_WIDEN = 3;
export const DISPATCH_RADIUS_WIDEN_FACTOR = 1.5;

export const DISPUTE_WINDOW_HOURS = 24;

export const COMPENSATION_CAP_PER_ITEM = 500000; // KES 5,000.00 in cents
export const COMPENSATION_CAP_PER_ORDER = 2000000; // KES 20,000.00 in cents

export const PILOT_TOWN = 'Kutus';

export const MIN_RATING_FOR_TIER = 10;
export const TIER_THRESHOLDS = {
  bronze: { rating: 3.5, onTimeRate: 0.7 },
  silver: { rating: 4.0, onTimeRate: 0.85 },
  gold: { rating: 4.5, onTimeRate: 0.95 },
};