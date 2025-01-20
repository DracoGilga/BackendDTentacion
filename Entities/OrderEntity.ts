import { ClientEntity } from "./ClientEntity.ts";
import { ProductEntity } from "./ProductEntity.ts";
import { Model } from 'objection';

export class OrderEntity extends Model {
    static tableName = 'orders';

    id!: number;
    totalPrice!: number;
    clientId!: number;

    client?: ClientEntity;
    products?: ProductEntity[];

    static relationMappings = {
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: () => ClientEntity,
            join: {
                from: 'orders.clientId',
                to: 'clients.id',
            },
        },
        products: {
            relation: Model.ManyToManyRelation,
            modelClass: () => ProductEntity,
            join: {
                from: 'orders.id',
                through: {
                    from: 'orders_products.orderId',
                    to: 'orders_products.productId',
                },
                to: 'products.id',
            },
        },
    };
}