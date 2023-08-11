import { z } from "zod";

export const createOrderSchema = z.object({
    productId: z.string({
        required_error: "Product Id is required",
        invalid_type_error: "Product Id must be a string",
    }),
});