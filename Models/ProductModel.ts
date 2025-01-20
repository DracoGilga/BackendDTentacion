import { ProductEntity } from '../Entities/ProductEntity';
import { CategoryProductEntity } from '../Entities/CategoryProductEntity';
import { IngredientEntity } from '../Entities/IngredientEntity';

export class ProductModel {
    static async findById(id: number): Promise<ProductEntity | null> {
        const product = await ProductEntity.query().findById(id).withGraphFetched('[category, ingredients]');
        return product || null;
    }

    static async findAll(): Promise<ProductEntity[]> {
        return await ProductEntity.query().withGraphFetched('[category, ingredients]');
    }

    static async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
        return await ProductEntity.query().insert(productData);
    }

    static async updateById(id: number, updateData: Partial<ProductEntity>): Promise<ProductEntity | null> {
        const updatedProduct = await ProductEntity.query().patchAndFetchById(id, updateData);
        return updatedProduct || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await ProductEntity.query().deleteById(id);
    }

    static async getCategoryByProductId(productId: number): Promise<CategoryProductEntity | null> {
        const product = await ProductEntity.query().findById(productId).withGraphFetched('category');
        return product?.category || null;
    }

    static async getIngredientsByProductId(productId: number): Promise<IngredientEntity[]> {
        const product = await ProductEntity.query().findById(productId).withGraphFetched('ingredients');
        return product?.ingredients || [];
    }
}
