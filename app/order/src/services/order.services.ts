import log from "../utils/logger";
import { OrderInput } from "../types/types";
//import { Order } from "../models/order.model";

export const createOrder = async (input: OrderInput, id: string) => {
    try {
        input.createdBy = id;
        //const order = await Order.create(input);

        return { order: "order", error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Order creation failed" };
    }
}

export const getOrders = async () => {
    try {
        //const orders = await Order.find({});
        return { orders: "orders", error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Orders fetching failed" };
    }
}