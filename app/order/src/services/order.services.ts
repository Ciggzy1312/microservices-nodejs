import log from "../utils/logger";
import { OrderInput } from "../types/types";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderStatusEnum } from "../types/enum";
import { orderCancelledPublisher, orderCreatedPublisher } from "../events/publisher/order.publisher";
import { expirationCreatedPublisher } from "../events/publisher/expiration.publisher";
import { paymentCreatedPublisher, paymentExpiredPublisher } from "../events/publisher/payment.publisher";

const EXPIRATION_TIME = 1 * 60;

export const createOrder = async (input: OrderInput, id: string) => {
    try {
        // Check if product exists
        const { productId } = input;
        const productExists = await Product.findById(productId);

        if (!productExists) {
            return { error: "Product not found" };
        }

        // Check if product is already reserved
        const isProductReserved = await Order.findOne({
            productId: productExists._id,
            status: {
                $ne: OrderStatusEnum.Cancelled,
            },
        });

        if (isProductReserved) {
            return { error: "Product is already reserved" };
        }

        // Set expiration time
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME);

        input.expiresAt = expiration;
        input.status = OrderStatusEnum.Created;
        input.createdBy = id;

        // Create the order
        const order = await Order.create(input);

        await orderCreatedPublisher(order, productExists);
        await expirationCreatedPublisher(order);
        await paymentCreatedPublisher(order, productExists);

        return { order, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Order creation failed" };
    }
}

export const getOrders = async (id: string) => {
    try {
        const orders = await Order.find({createdBy: id}).populate("productId");
        
        return { orders, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Orders fetching failed" };
    }
}

export const getOrder = async (id: string, orderId: string) => {
    try {
        const order = await Order.findById(orderId).populate("productId").where("createdBy", id);
        if (!order) {
            return { error: "Order not found" };
        }

        return { order, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Order fetching failed" };        
    }
};

export const updateOrder = async (id: string, orderId: string, orderStatus: OrderStatusEnum) => {
    try {
        const orderExists = await Order.findById(orderId).where("createdBy", id);
        if (!orderExists) {
            return { error: "Order not found or not authorized to acces this order" };
        }

        let order

        if (orderExists.status === OrderStatusEnum.Completed) {
            return { error: "Order is already completed" };
        }

        if (orderStatus === OrderStatusEnum.Cancelled) {
            order = await Order.findByIdAndUpdate(orderId, { status: orderStatus }, { new: true }).where("createdBy", id);
            await orderCancelledPublisher(order);
            await paymentExpiredPublisher(order);
        } else {
            order = await Order.findByIdAndUpdate(orderId, { status: orderStatus }, { new: true }).where("createdBy", id);
        }


        return { order, error: null };
    } catch (error: any) {
        log.error(error.message);
        return { error: "Order status update failed" };
    }
};
