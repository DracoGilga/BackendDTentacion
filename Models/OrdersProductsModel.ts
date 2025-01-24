import { Model } from "objection";
import { OrderModel } from "./OrderModel";
import { ProductModel } from "./ProductModel";

export class OrdersProductsModel extends Model {
    static tableName = 'orders_products';

    id!: number;
    orderId!: number;
    productId!: number;

    static relationMappings = {
        order: {
            relation: Model.BelongsToOneRelation,
            modelClass: OrderModel,
            join: {
                from: 'orders_products.orderId',
                to: 'orders.id'
            }
        },
        product: {
            relation: Model.BelongsToOneRelation,
            modelClass: ProductModel,
            join: {
                from: 'orders_products.productId',
                to: 'products.id'
            }
        }
    };
}