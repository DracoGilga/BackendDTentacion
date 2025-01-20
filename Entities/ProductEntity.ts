import { CategoryProductEntity } from "./CategoryProductEntity.ts";
import { IngredientEntity } from "./IngredientEntity.ts";
import { Model } from 'objection';

export class ProductEntity extends Model {
    static tableName = 'products';

    id!: number;
    productName!: string;
    stock!: number;
    finalPrice!: number;
    expirationDate!: Date;
    categoryId!: number;

    category?: CategoryProductEntity;
    ingredients?: IngredientEntity[];

    static relationMappings = {
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: () => CategoryProductEntity,
            join: {
                from: 'products.categoryId',
                to: 'categories.id',
            },
        },
        ingredients: {
            relation: Model.ManyToManyRelation,
            modelClass: () => IngredientEntity,
            join: {
                from: 'products.id',
                through: {
                    from: 'products_ingredients.productId',
                    to: 'products_ingredients.ingredientId',
                },
                to: 'ingredients.id',
            },
        },
    };
}