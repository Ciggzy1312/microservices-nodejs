import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Email must be a valid email" }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be at least 6 characters" }),
});

export const loginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Email must be a valid email" }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, { message: "Password must be at least 6 characters" }),
});