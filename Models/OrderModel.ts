import { OrderEntity } from '../Entities/OrderEntity';
import { ClientEntity } from '../Entities/ClientEntity';
import { ProductEntity } from '../Entities/ProductEntity';

export class OrderModel {
    static async findById(id: number): Promise<OrderEntity | null> {
        const order = await OrderEntity.query().findById(id).withGraphFetched('[client, products]');
        return order || null;
    }

    static async findAll(): Promise<OrderEntity[]> {
        return await OrderEntity.query().withGraphFetched('[client, products]');
    }

    static async create(orderData: Partial<OrderEntity>): Promise<OrderEntity> {
        return await OrderEntity.query().insert(orderData);
    }

    static async updateById(id: number, updateData: Partial<OrderEntity>): Promise<OrderEntity | null> {
        const updatedOrder = await OrderEntity.query().patchAndFetchById(id, updateData);
        return updatedOrder || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await OrderEntity.query().deleteById(id);
    }

    static async getClientByOrderId(orderId: number): Promise<ClientEntity | null> {
        const order = await OrderEntity.query().findById(orderId).withGraphFetched('client');
        return order?.client || null;
    }

    static async getProductsByOrderId(orderId: number): Promise<ProductEntity[]> {
        const order = await OrderEntity.query().findById(orderId).withGraphFetched('products');
        return order?.products || [];
    }
};