export enum OrderStatusEnum {
    Created = "created",
    Pending = "pending",
    Completed = "completed",
    Cancelled = "cancelled",
}

export enum OrderPublisherEnum {
    Created = "order:created",
    Cancelled = "order:cancelled",
}

export enum ExpirationPublisherEnum {
    Created = "expiration:created",
}

export enum ConsumerTypeEnum {
    Product = "product",
    Expiration = "expiration",
}

export enum ProductConsumerEnum {
    Created = "product:created",
    Updated = "product:updated",
}

export enum ExpirationConsumerEnum {
    Completed = "expiration:completed",
}