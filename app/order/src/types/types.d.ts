declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export interface OrderInput {
    name: string;
    description: string;
    price: string;
    createdBy: string;
}