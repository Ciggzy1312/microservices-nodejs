import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import log from "../utils/logger";
import { UserInput } from "../types/types";
import { User } from "../models/user.model";

export const createUser = async (input: UserInput) => {
    try {
        const userExists = await User.findOne({ email: input.email });
        if (userExists) {
            return { error: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(input.password, salt);
        input.password = hashedPassword;

        const user = await User.create(input);
        return { user, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "User registration failed" };
    }
}

export const loginUser = async (input: UserInput) => {
    try {
        const user = await User.findOne({ email: input.email });

        if (user && (await bcrypt.compare(input.password, user.password))) {
            const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.SECRET!, { expiresIn: '30d' })
            return { token, error: null };
        }

        return { error: "Invalid credentials" };
    } catch (error: any) {
        log.error(error.message);
        return { error: "User login failed" };
    }
}