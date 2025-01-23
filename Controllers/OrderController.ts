import { OrderModel } from '../Models/OrderModel';

export class OrderController {
    static async getOrderById(id: number) {
        return await OrderModel.findById(id);
    }

    static async getAllOrders() {
        return await OrderModel.findAll();
    }

    static async createOrder(input: Partial<OrderModel>) {
        return await OrderModel.create(input);
    }

    static async updateOrder(id: number, input: Partial<OrderModel>) {
        return await OrderModel.updateById(id, input);
    }

    static async deleteOrder(id: number) {
        const deletedRows = await OrderModel.deleteById(id);
        
        return deletedRows > 0;
    }

    static async getClientByOrderId(orderId: number) {
        return await OrderModel.getClientByOrderId(orderId);
    }

    static async getProductsByOrderId(orderId: number) {
        return await OrderModel.getProductsByOrderId(orderId);
    }
}