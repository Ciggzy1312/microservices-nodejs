import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    price: z.string({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
});

export const updateProductSchema = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
    }).optional(),
    description: z.string({
        invalid_type_error: "Description must be a string",
    }).optional(),
    price: z.string({
        invalid_type_error: "Price must be a number",
    }).optional()
});