export declare const MONEY_PRECISION = 100;
export declare const ORDER_STATE_TRANSITIONS: Record<string, string[]>;
export declare const ALLOWED_ACTORS: Record<string, string[]>;
export declare const PRICE_VARIANCE_THRESHOLD = 0.15;
export declare const PROVIDER_COMMISSION_RATE = 0.15;
export declare const DELIVERY_FEE_PLATFORM_SHARE_MIN = 0.1;
export declare const DELIVERY_FEE_PLATFORM_SHARE_MAX = 0.2;
export declare const DEFAULT_DELIVERY_BASE_FEE = 10000;
export declare const DEFAULT_DELIVERY_PER_KM_RATE = 5000;
export declare const DEFAULT_PEAK_SURCHARGE = 5000;
export declare const DEFAULT_SERVICE_FEE = 2000;
export declare const DISPATCH_OFFER_TIMEOUT_MS = 30000;
export declare const DISPATCH_MAX_MISSES_BEFORE_WIDEN = 3;
export declare const DISPATCH_RADIUS_WIDEN_FACTOR = 1.5;
export declare const DISPUTE_WINDOW_HOURS = 24;
export declare const COMPENSATION_CAP_PER_ITEM = 500000;
export declare const COMPENSATION_CAP_PER_ORDER = 2000000;
export declare const PILOT_TOWN = "Kutus";
export declare const MIN_RATING_FOR_TIER = 10;
export declare const TIER_THRESHOLDS: {
    bronze: {
        rating: number;
        onTimeRate: number;
    };
    silver: {
        rating: number;
        onTimeRate: number;
    };
    gold: {
        rating: number;
        onTimeRate: number;
    };
};
