"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.ServiceUnit = exports.VehicleType = exports.VerificationStatus = exports.LegKind = exports.PaymentType = exports.OrderEventType = exports.OrderState = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["CUSTOMER"] = "customer";
    UserRole["PROVIDER"] = "provider";
    UserRole["RIDER"] = "rider";
    UserRole["ADMIN"] = "admin";
    UserRole["SYSTEM"] = "system";
})(UserRole || (exports.UserRole = UserRole = {}));
var OrderState;
(function (OrderState) {
    OrderState["PLACED"] = "placed";
    OrderState["ACCEPTED"] = "accepted";
    OrderState["RIDER_ASSIGNED"] = "rider_assigned";
    OrderState["PICKED_UP"] = "picked_up";
    OrderState["AT_PROVIDER"] = "at_provider";
    OrderState["WEIGHED"] = "weighed";
    OrderState["PROCESSING"] = "processing";
    OrderState["READY"] = "ready";
    OrderState["OUT_FOR_DELIVERY"] = "out_for_delivery";
    OrderState["DELIVERED"] = "delivered";
    OrderState["COMPLETED"] = "completed";
    OrderState["CANCELLED"] = "cancelled";
    OrderState["DISPUTED"] = "disputed";
})(OrderState || (exports.OrderState = OrderState = {}));
var OrderEventType;
(function (OrderEventType) {
    OrderEventType["STATE_CHANGE"] = "state_change";
    OrderEventType["PRICE_CHANGE"] = "price_change";
    OrderEventType["PHOTO_UPLOAD"] = "photo_upload";
    OrderEventType["ITEM_COUNT"] = "item_count";
    OrderEventType["LOCATION_UPDATE"] = "location_update";
})(OrderEventType || (exports.OrderEventType = OrderEventType = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["CHARGE"] = "charge";
    PaymentType["HOLD"] = "hold";
    PaymentType["REFUND"] = "refund";
    PaymentType["COMMISSION"] = "commission";
    PaymentType["PAYOUT"] = "payout";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
var LegKind;
(function (LegKind) {
    LegKind["PICKUP"] = "pickup";
    LegKind["RETURN"] = "return";
})(LegKind || (exports.LegKind = LegKind = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "pending";
    VerificationStatus["APPROVED"] = "approved";
    VerificationStatus["REJECTED"] = "rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["BIKE"] = "bike";
    VehicleType["SCOOTER"] = "scooter";
    VehicleType["VAN"] = "van";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var ServiceUnit;
(function (ServiceUnit) {
    ServiceUnit["KG"] = "kg";
    ServiceUnit["PIECE"] = "piece";
})(ServiceUnit || (exports.ServiceUnit = ServiceUnit = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ASSIGNED"] = "assigned";
    OrderStatus["PICKUP_ENROUTE"] = "pickup_enroute";
    OrderStatus["PICKUP_ARRIVED"] = "pickup_arrived";
    OrderStatus["PICKUP_COMPLETED"] = "pickup_completed";
    OrderStatus["RETURN_ENROUTE"] = "return_enroute";
    OrderStatus["RETURN_ARRIVED"] = "return_arrived";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=enums.js.map