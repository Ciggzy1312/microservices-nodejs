declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}