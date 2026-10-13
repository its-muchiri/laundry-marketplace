"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_THRESHOLDS = exports.MIN_RATING_FOR_TIER = exports.PILOT_TOWN = exports.COMPENSATION_CAP_PER_ORDER = exports.COMPENSATION_CAP_PER_ITEM = exports.DISPUTE_WINDOW_HOURS = exports.DISPATCH_RADIUS_WIDEN_FACTOR = exports.DISPATCH_MAX_MISSES_BEFORE_WIDEN = exports.DISPATCH_OFFER_TIMEOUT_MS = exports.DEFAULT_SERVICE_FEE = exports.DEFAULT_PEAK_SURCHARGE = exports.DEFAULT_DELIVERY_PER_KM_RATE = exports.DEFAULT_DELIVERY_BASE_FEE = exports.DELIVERY_FEE_PLATFORM_SHARE_MAX = exports.DELIVERY_FEE_PLATFORM_SHARE_MIN = exports.PROVIDER_COMMISSION_RATE = exports.PRICE_VARIANCE_THRESHOLD = exports.ALLOWED_ACTORS = exports.ORDER_STATE_TRANSITIONS = exports.MONEY_PRECISION = void 0;
exports.MONEY_PRECISION = 100;
exports.ORDER_STATE_TRANSITIONS = {
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
exports.ALLOWED_ACTORS = {
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
exports.PRICE_VARIANCE_THRESHOLD = 0.15;
exports.PROVIDER_COMMISSION_RATE = 0.15;
exports.DELIVERY_FEE_PLATFORM_SHARE_MIN = 0.10;
exports.DELIVERY_FEE_PLATFORM_SHARE_MAX = 0.20;
exports.DEFAULT_DELIVERY_BASE_FEE = 10000;
exports.DEFAULT_DELIVERY_PER_KM_RATE = 5000;
exports.DEFAULT_PEAK_SURCHARGE = 5000;
exports.DEFAULT_SERVICE_FEE = 2000;
exports.DISPATCH_OFFER_TIMEOUT_MS = 30000;
exports.DISPATCH_MAX_MISSES_BEFORE_WIDEN = 3;
exports.DISPATCH_RADIUS_WIDEN_FACTOR = 1.5;
exports.DISPUTE_WINDOW_HOURS = 24;
exports.COMPENSATION_CAP_PER_ITEM = 500000;
exports.COMPENSATION_CAP_PER_ORDER = 2000000;
exports.PILOT_TOWN = 'Kutus';
exports.MIN_RATING_FOR_TIER = 10;
exports.TIER_THRESHOLDS = {
    bronze: { rating: 3.5, onTimeRate: 0.7 },
    silver: { rating: 4.0, onTimeRate: 0.85 },
    gold: { rating: 4.5, onTimeRate: 0.95 },
};
//# sourceMappingURL=constants.js.map