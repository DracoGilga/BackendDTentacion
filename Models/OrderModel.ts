import { Model } from 'objection';
import { ClientModel } from "./ClientModel";
import { ProductModel } from "./ProductModel";

export class OrderModel extends Model {
    static tableName = 'orders';

    id!: number;
    totalPrice!: number;
    clientId!: number;

    client?: ClientModel;
    products?: ProductModel[];

    static async findById(id: number): Promise<OrderModel | null> {
        return await this.query().findById(id).withGraphFetched('[client, products]') || null;
    }

    static async findAll(): Promise<OrderModel[]> {
        return await this.query().withGraphFetched('[client, products]');
    }

    static async create(orderData: Partial<OrderModel>): Promise<OrderModel> {
        return await this.query().insert(orderData);
    }

    static async updateById(id: number, updateData: Partial<OrderModel>): Promise<OrderModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }

    static async getClientByOrderId(orderId: number): Promise<ClientModel | null> {
        const order = await this.query().findById(orderId).withGraphFetched('client');
        return order?.client || null;
    }

    static async getProductsByOrderId(orderId: number): Promise<ProductModel[]> {
        const order = await this.query().findById(orderId).withGraphFetched('products');
        return order?.products || [];
    }
}