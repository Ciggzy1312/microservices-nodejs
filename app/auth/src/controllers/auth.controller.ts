import { Request, Response } from "express";
import { createUser, loginUser } from "../services/auth.services";
import log from "../utils/logger";

const createUserHandler = async (req: Request, res: Response) => {
    try {
        const { user, error } = await createUser(req.body);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`User registered successfully`);
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: "User registration failed" });
    }
}

const loginUserHandler = async (req: Request, res: Response) => {
    try {
        const { token, error } = await loginUser(req.body);

        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        res.cookie('token', token);
        log.info(`User logged in successfully`);
        return res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        log.error(error);
        res.status(400).json({ message: "User login failed" });
    }
}

export { createUserHandler, loginUserHandler }