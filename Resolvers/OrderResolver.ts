import { OrderModel } from '../Models/OrderModel';

export const OrderResolver = {
    Query: {
        getOrderById: async (_: any, { id }: { id: number }) => {
            return await OrderModel.findById(id);
        },
        getAllOrders: async () => {
            return await OrderModel.findAll();
        },
    },
    Mutation: {
        createOrder: async (_: any, { input }: { input: Partial<OrderModel> }) => {
            return await OrderModel.create(input);
        },
        updateOrder: async (_: any, { id, input }: { id: number; input: Partial<OrderModel> }) => {
            return await OrderModel.updateById(id, input);
        },
        deleteOrder: async (_: any, { id }: { id: number }) => {
            const deletedRows = await OrderModel.deleteById(id);
            return deletedRows > 0;
        },
    },
    Order: {
        client: async (order: any) => {
            return await OrderModel.getClientByOrderId(order.id);
        },
        products: async (order: any) => {
            return await OrderModel.getProductsByOrderId(order.id);
        },
    },
};