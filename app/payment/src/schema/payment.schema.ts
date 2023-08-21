import { z } from "zod";

export const createPaymentSchema = z.object({
    orderId: z.string({
        required_error: "OrderId is required",
        invalid_type_error: "OrderId must be a string",
    }),
});