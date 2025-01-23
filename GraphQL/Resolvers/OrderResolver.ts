import { OrderController } from "../../Controllers/OrderController";
import { OrderModel } from "../../Models/OrderModel";

export const OrderResolver = {
    Query: {
        getOrderById: async (_: any, { id }: { id: number }) => {
            return await OrderController.getOrderById(id);
        },
        getAllOrders: async () => {
            return await OrderController.getAllOrders();
        },
    },
    Mutation: {
        createOrder: async (_: any, { input }: { input: Partial<OrderModel> }) => {
            return await OrderController.createOrder(input);
        },
        updateOrder: async (_: any, { id, input }: { id: number; input: Partial<OrderModel> }) => {
            return await OrderController.updateOrder(id, input);
        },
        deleteOrder: async (_: any, { id }: { id: number }) => {
            return await OrderController.deleteOrder(id);
        },
    },
    Order: {
        client: async (order: any) => {
            return await OrderController.getClientByOrderId(order.id);
        },
        products: async (order: any) => {
            return await OrderController.getProductsByOrderId(order.id);
        },
    },
};