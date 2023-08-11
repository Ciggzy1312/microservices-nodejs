import { OrderStatus } from "./enum";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export interface OrderInput {
    status: OrderStatus;
    expiresAt: Date;
    createdBy: string;
    productId: string;
}