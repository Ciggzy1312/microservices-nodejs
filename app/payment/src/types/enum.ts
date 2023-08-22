export enum OrderStatusEnum {
    Created = "created",
    Pending = "pending",
    Completed = "completed",
    Cancelled = "cancelled",
}

export enum PaymentPublisherEnum {
    Success = "payment:success",
}

export enum ConsumerTypeEnum {
    Payment = "payment",
}

export enum OrderConsumerEnum {
    Created = "payment:created",
}