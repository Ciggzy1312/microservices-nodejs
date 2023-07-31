declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export interface ProductInput {
    name: string;
    description: string;
    price: string;
    createdBy: string;
}