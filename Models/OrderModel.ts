import { Model } from 'objection';
import { ClientModel } from "./ClientModel";
import { ProductModel } from "./ProductModel";
import { BranchModel } from './BranchModel';

export class OrderModel extends Model {
    static tableName = 'orders';

    id!: number;
    totalPrice!: number;
    clientId!: number;

    client?: ClientModel;
    products?: ProductModel[];
    branches?: BranchModel;

    static relationMappings = {
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: ClientModel,
            join: {
                from: 'orders.clientId',
                to: 'clients.id'
            }
        },
        products: {
            relation: Model.ManyToManyRelation,
            modelClass: ProductModel,
            join: {
                from: 'orders.id',
                through: {
                    from: 'orders_products.orderId',
                    to: 'orders_products.productId'
                },
                to: 'products.id'
            }
        },
        branches: {
            relation: Model.BelongsToOneRelation,
            modelClass: BranchModel,
            join: {
                from: 'orders.branchId',
                to: 'branches.id'
            }
        }
    };

    static async findById(id: number): Promise<OrderModel | null> {
        return await this.query().findById(id).withGraphJoined('[client, products, branches.ubication]') || null;
    }

    static async findAll(): Promise<OrderModel[]> {
        return await this.query().withGraphJoined('[client, products, branches.ubication]');
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
        const order = await this.query().findById(orderId).withGraphJoined('client');
        return order?.client || null;
    }

    static async getProductsByOrderId(orderId: number): Promise<ProductModel[]> {
        const order = await this.query().findById(orderId).withGraphJoined('products');
        return order?.products || [];
    }

    static async getBranchByOrderId(orderId: number): Promise<BranchModel | null> {
        const order = await this.query().findById(orderId).withGraphJoined('branches.ubication'); 
        return order?.branches || null;
    }
}