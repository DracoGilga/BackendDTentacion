import { OrderModel } from '../Models/OrderModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class OrderController {
    static async getOrderById(id: number) {
        const cacheKey = `order:${id}`;

        return await RedisHelper.getOrCreate<OrderModel | null>(cacheKey, async () => {
            return await OrderModel.findById(id);
        });
    }

    static async getAllOrders() {
        const cacheKey = 'orders:all';

        return await RedisHelper.getOrCreate<OrderModel[]>(cacheKey, async () => {
            return await OrderModel.findAll();
        });
    }

    static async createOrder(input: Partial<OrderModel>) {
        const newOrder = await OrderModel.create(input);

        await RedisHelper.delKeysByPattern('orders:*');

        return newOrder;
    }

    static async updateOrder(id: number, input: Partial<OrderModel>) {
        const updatedOrder = await OrderModel.updateById(id, input);

        if (updatedOrder) {
            const cacheKey = `order:${id}`;
            await RedisHelper.set(cacheKey, updatedOrder);

            await RedisHelper.delKeysByPattern('orders:*');
        }

        return updatedOrder;
    }

    static async deleteOrder(id: number) {
        const deletedRows = await OrderModel.deleteById(id);

        if (deletedRows > 0) {
            const cacheKey = `order:${id}`;
            await RedisHelper.del(cacheKey);

            await RedisHelper.delKeysByPattern('orders:*');
        }

        return deletedRows > 0;
    }

    static async getClientByOrderId(orderId: number) {
        const cacheKey = `client:order:${orderId}`;

        return await RedisHelper.getOrCreate<any>(cacheKey, async () => {
            return await OrderModel.getClientByOrderId(orderId);
        });
    }

    static async getProductsByOrderId(orderId: number) {
        const cacheKey = `products:order:${orderId}`;

        return await RedisHelper.getOrCreate<any>(cacheKey, async () => {
            return await OrderModel.getProductsByOrderId(orderId);
        });
    }

    static async getBranchByOrderId(orderId: number) {
        const cacheKey = `branch:order:${orderId}`;

        return await RedisHelper.getOrCreate<any>(cacheKey, async () => {
            return await OrderModel.getBranchByOrderId(orderId);
        });
    }
}