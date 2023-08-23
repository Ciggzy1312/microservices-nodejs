import { Request, Response } from "express";
import { updateOrder, createOrder, getOrder, getOrders } from "../services/order.services";
import log from "../utils/logger";
import { OrderStatusEnum } from "../types/enum";

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
        const { id } = req.user;
        const { orders, error } = await getOrders(id);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info(`Orders fetched successfully`);
        return res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
        log.error({ message: "Orders fetching failed", error });
        res.status(400).json({ message: "Orders fetching failed" });
    }
}

const getOrderHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { orderId } = req.params;
        const { order, error } = await getOrder(id, orderId);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Order fetched successfully");
        return res.status(200).json({ message: "Order fetched successfully", order });
    } catch (error) {
        log.error({ message: "Order fetching failed", error });
        res.status(400).json({ message: "Order fetching failed" });
    }
}

const cancelOrderHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { orderId } = req.params;
        const { order, error } = await updateOrder(id, orderId, OrderStatusEnum.Cancelled);
        if (error) {
            log.error(error);
            return res.status(400).json({ message: error });
        }

        log.info("Order cancelled successfully");
        return res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        log.error({ message: "Order cancellation failed", error });
        res.status(400).json({ message: "Order cancellation failed" });
    }
}

export { createOrderHandler, getOrdersHandler, getOrderHandler, cancelOrderHandler }