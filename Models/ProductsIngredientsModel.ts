import { Model } from 'objection';
import { ProductModel } from './ProductModel';
import { IngredientModel } from './IngredientModel';

export class ProductsIngredientsModel extends Model {
    static tableName = 'products_ingredients';

    id!: number;
    productId!: number;
    ingredientId!: number;

    static relationMappings = {
        product: {
            relation: Model.BelongsToOneRelation,
            modelClass: ProductModel,
            join: {
                from: 'products_ingredients.productId',
                to: 'products.id'
            }
        },
        ingredient: {
            relation: Model.BelongsToOneRelation,
            modelClass: IngredientModel,
            join: {
                from: 'products_ingredients.ingredientId',
                to: 'ingredients.id'
            }
        }
    };
}