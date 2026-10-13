export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  pilotTown: process.env.PILOT_TOWN || 'Kutus',

  // Money settings
  moneyPrecision: 100,

  // Provider commission
  providerCommissionRate: parseFloat(process.env.PROVIDER_COMMISSION_RATE || '0.15'),

  // Delivery fee settings
  deliveryBaseFee: parseInt(process.env.DELIVERY_BASE_FEE || '10000', 10),
  deliveryPerKmRate: parseInt(process.env.DELIVERY_PER_KM_RATE || '5000', 10),
  peakSurcharge: parseInt(process.env.PEAK_SURCHARGE || '5000', 10),
  platformShareMin: parseFloat(process.env.PLATFORM_SHARE_MIN || '0.10'),
  platformShareMax: parseFloat(process.env.PLATFORM_SHARE_MAX || '0.20'),

  // Service fee
  serviceFee: parseInt(process.env.SERVICE_FEE || '2000', 10),
  chargeServiceFee: process.env.CHARGE_SERVICE_FEE === 'true',

  // Price variance threshold
  priceVarianceThreshold: parseFloat(process.env.PRICE_VARIANCE_THRESHOLD || '0.15'),

  // Dispatch settings
  dispatchOfferTimeoutMs: parseInt(process.env.DISPATCH_OFFER_TIMEOUT_MS || '30000', 10),
  dispatchMaxMissesBeforeWiden: parseInt(process.env.DISPATCH_MAX_MISSES_BEFORE_WIDEN || '3', 10),
  dispatchRadiusWidenFactor: parseFloat(process.env.DISPATCH_RADIUS_WIDEN_FACTOR || '1.5'),

  // Dispute window
  disputeWindowHours: parseInt(process.env.DISPUTE_WINDOW_HOURS || '24', 10),

  // Compensation caps
  compensationCapPerItem: parseInt(process.env.COMPENSATION_CAP_PER_ITEM || '500000', 10),
  compensationCapPerOrder: parseInt(process.env.COMPENSATION_CAP_PER_ORDER || '2000000', 10),

  // Google Maps
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  googleMapsServerKey: process.env.GOOGLE_MAPS_SERVER_KEY,

  // M-Pesa Daraja
  mpesaConsumerKey: process.env.MPESA_CONSUMER_KEY,
  mpesaConsumerSecret: process.env.MPESA_CONSUMER_SECRET,
  mpesaShortcode: process.env.MPESA_SHORTCODE,
  mpesaPasskey: process.env.MPESA_PASSKEY,
  mpesaCallbackUrl: process.env.MPESA_CALLBACK_URL,
  mpesaEnvironment: process.env.MPESA_ENVIRONMENT || 'sandbox',

  // Africa's Talking
  africasTalkingUsername: process.env.AFRICAS_TALKING_USERNAME,
  africasTalkingApiKey: process.env.AFRICAS_TALKING_API_KEY,
  africasTalkingSenderId: process.env.AFRICAS_TALKING_SENDER_ID,

  // Firebase
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,

  // Card providers (Phase 2)
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
  pesapalConsumerKey: process.env.PESAPAL_CONSUMER_KEY,
  pesapalConsumerSecret: process.env.PESAPAL_CONSUMER_SECRET,

  // OTP settings
  otpExpiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10),
  otpLength: parseInt(process.env.OTP_LENGTH || '6', 10),
  otpRateLimitPerHour: parseInt(process.env.OTP_RATE_LIMIT_PER_HOUR || '3', 10),
});
