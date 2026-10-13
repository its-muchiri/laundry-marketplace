export declare enum UserRole {
    CUSTOMER = "customer",
    PROVIDER = "provider",
    RIDER = "rider",
    ADMIN = "admin",
    SYSTEM = "system"
}
export declare enum OrderState {
    PLACED = "placed",
    ACCEPTED = "accepted",
    RIDER_ASSIGNED = "rider_assigned",
    PICKED_UP = "picked_up",
    AT_PROVIDER = "at_provider",
    WEIGHED = "weighed",
    PROCESSING = "processing",
    READY = "ready",
    OUT_FOR_DELIVERY = "out_for_delivery",
    DELIVERED = "delivered",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    DISPUTED = "disputed"
}
export declare enum OrderEventType {
    STATE_CHANGE = "state_change",
    PRICE_CHANGE = "price_change",
    PHOTO_UPLOAD = "photo_upload",
    ITEM_COUNT = "item_count",
    LOCATION_UPDATE = "location_update"
}
export declare enum PaymentType {
    CHARGE = "charge",
    HOLD = "hold",
    REFUND = "refund",
    COMMISSION = "commission",
    PAYOUT = "payout"
}
export declare enum LegKind {
    PICKUP = "pickup",
    RETURN = "return"
}
export declare enum VerificationStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum VehicleType {
    BIKE = "bike",
    SCOOTER = "scooter",
    VAN = "van"
}
export declare enum ServiceUnit {
    KG = "kg",
    PIECE = "piece"
}
export declare enum OrderStatus {
    ASSIGNED = "assigned",
    PICKUP_ENROUTE = "pickup_enroute",
    PICKUP_ARRIVED = "pickup_arrived",
    PICKUP_COMPLETED = "pickup_completed",
    RETURN_ENROUTE = "return_enroute",
    RETURN_ARRIVED = "return_arrived",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
