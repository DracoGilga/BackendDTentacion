import { Model } from 'objection';
import { CategoryProductModel } from './CategoryProductModel';
import { IngredientModel } from './IngredientModel';

export class ProductModel extends Model {
    static tableName = 'products';

    id!: number;
    productName!: string;
    stock!: number;
    finalPrice!: number;
    expirationDate!: Date;
    categoryId!: number;

    category?: CategoryProductModel | null;
    ingredients?: IngredientModel[];

    static relationMappings = {
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: CategoryProductModel,
            join: {
                from: 'products.categoryId',
                to: 'category_product.id'
            }
        },
        ingredients: {
            relation: Model.ManyToManyRelation,
            modelClass: IngredientModel,
            join: {
                from: 'products.id',
                through: {
                    from: 'products_ingredients.productId', 
                    to: 'products_ingredients.ingredientId' 
                },
                to: 'ingredients.id'               
            }
        }
    };

    static async findById(id: number): Promise<ProductModel | null> {
        return await this.query().findById(id).withGraphJoined('[category, ingredients]') || null;
    }
    
    static async findAll(): Promise<ProductModel[]> {
        return await this.query().withGraphJoined('[category, ingredients]');
    }
    
    static async create(productData: Partial<ProductModel>): Promise<ProductModel> {
        return await this.query().insert(productData);
    }
    
    static async updateById(id: number, updateData: Partial<ProductModel>): Promise<ProductModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }
    
    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }
    
    static async getCategoryByProductId(productId: number): Promise<CategoryProductModel | null> {
        const product = await this.query().findById(productId).withGraphJoined('category');
        return product?.category || null;
    }
    
    static async getIngredientsByProductId(productId: number): Promise<IngredientModel[]> {
        const product = await this.query().findById(productId).withGraphJoined('ingredients');
        return product?.ingredients || [];
    }    
}