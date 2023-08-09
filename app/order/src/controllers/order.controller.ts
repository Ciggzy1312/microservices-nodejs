import { Request, Response } from "express";
import { createOrder, getOrders } from "../services/order.services";
import log from "../utils/logger";

const createOrderHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { order, error } = await createOrder(req.body, id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Order created successfully`);
        return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        log.error({ message: "Order creation failed", error });
        res.status(400).json({ message: "Order creation failed" });
    }
}

const getOrdersHandler = async (req: Request, res: Response) => {
    try {
        const { orders, error } = await getOrders();
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Orders fetched successfully`);
        return res.status(201).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        log.error({ message: "Order fetching failed", error });
        res.status(400).json({ message: "Order fetching failed" });
    }
}

export { createOrderHandler, getOrdersHandler }