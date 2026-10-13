export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  coordinates: Coordinates;
  landmarkNote: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  role: import('./enums').UserRole;
  verificationStatus: import('./enums').VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  onboardingCompleted?: boolean;
}

export interface Provider {
  id: string;
  userId: string;
  facilityCoordinates: Coordinates;
  radiusMeters: number;
  dailyCapacityKg: number;
  openingHours: OpeningHours;
  turnaroundHours: number;
  tier: 'bronze' | 'silver' | 'gold';
  commissionRate: number;
  payoutDetails: PayoutDetails;
  verificationStatus: import('./enums').VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string; // HH:mm
  close: string; // HH:mm
  closed: boolean;
}

export interface PayoutDetails {
  mpesaNumber: string;
  bankAccount?: BankAccount;
  verified: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface ServiceItem {
  id: string;
  providerId: string;
  name: string;
  unit: import('./enums').ServiceUnit;
  priceCents: number;
  turnaroundHours: number;
  category: ServiceCategory;
  tags: string[];
  isActive: boolean;
}

export enum ServiceCategory {
  WASH_FOLD = 'wash_fold',
  DRY_CLEANING = 'dry_cleaning',
  IRONING = 'ironing',
  SPECIALTY = 'specialty',
}

export interface Rider {
  id: string;
  userId: string;
  vehicleType: import('./enums').VehicleType;
  vehicleRegistration: string;
  documents: RiderDocuments;
  isAvailable: boolean;
  currentCoordinates?: Coordinates;
  score: number;
  payoutNumber: string;
  verificationStatus: import('./enums').VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiderDocuments {
  nationalId: DocumentRef;
  drivingLicense: DocumentRef;
  vehicleRegistration: DocumentRef;
  backgroundCheck: DocumentRef;
}

export interface DocumentRef {
  url: string;
  expiresAt: Date;
  verified: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  providerId: string;
  state: import('./enums').OrderState;
  estimatedPriceCents: number;
  finalPriceCents?: number;
  approvalRequired: boolean;
  customerApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RiderOrder extends Order {
  provider?: {
    id: string;
    name: string;
    rating: number;
    imageUrl?: string;
    address: string;
    phone: string;
  };
  serviceType?: string;
  status: import('./enums').OrderStatus;
  totalDistanceMeters?: number;
  totalAmountCents?: number;
  riderEarningsCents?: number;
  estimatedWeightKg?: number;
  actualWeightKg?: number;
  pickupWindowStart?: string;
  pickupWindowEnd?: string;
  dropoffWindowStart?: string;
  dropoffWindowEnd?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  customerName?: string;
  customerPhone?: string;
  pickupCompletedAt?: string;
  returnCompletedAt?: string;
  legs?: RiderOrderLeg[];
}

export interface RiderOrderLeg {
  id: string;
  orderId: string;
  legType: 'pickup' | 'return';
  riderId?: string;
  roadDistanceMeters: number;
  feeCents: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  providerName?: string;
  customerName?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  serviceItemId: string;
  quantity: number;
  weightKg?: number;
  priceCents: number;
}

export interface OrderLeg {
  id: string;
  orderId: string;
  kind: import('./enums').LegKind;
  riderId?: string;
  roadDistanceMeters: number;
  feeCents: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderEvent {
  id: string;
  orderId: string;
  fromState: import('./enums').OrderState;
  toState: import('./enums').OrderState;
  actorId: string;
  actorRole: import('./enums').UserRole;
  coordinates?: Coordinates;
  photoUrls: string[];
  itemCount?: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  type: import('./enums').PaymentType;
  amountCents: number;
  providerRef: string;
  idempotencyKey: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface LedgerEntry {
  id: string;
  orderId: string;
  paymentId?: string;
  account: string;
  debitCents: number;
  creditCents: number;
  reference: string;
  idempotencyKey: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  orderId: string;
  raterId: string;
  targetId: string;
  targetRole: import('./enums').UserRole;
  stars: number;
  comment?: string;
  createdAt: Date;
}

export interface Dispute {
  id: string;
  orderId: string;
  openedBy: string;
  evidence: DisputeEvidence;
  decision?: DisputeDecision;
  amountCents?: number;
  status: 'open' | 'resolved' | 'rejected';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface DisputeEvidence {
  photos: string[];
  messages: string[];
  timestamps: Date[];
}

export interface DisputeDecision {
  decidedBy: string;
  outcome: 'refund_customer' | 'pay_provider' | 'pay_rider' | 'split' | 'reject';
  amountCents: number;
  reasoning: string;
}

export interface Settings {
  key: string;
  value: string;
  description: string;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}