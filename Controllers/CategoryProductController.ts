import { CategoryProductModel } from '../Models/CategoryProductModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class CategoryProductController {
    static async getCategoryProductById(id: number) {
        const cacheKey = `category_product:${id}`;
        return RedisHelper.getOrCreate<CategoryProductModel | null>(
            cacheKey,
            async () => CategoryProductModel.findById(id)
        );
    }

    static async getAllCategoryProducts() {
        const cacheKey = `categories:all`;
        return RedisHelper.getOrCreate<CategoryProductModel[]>(
            cacheKey,
            async () => CategoryProductModel.findAll()
        );
    }

    static async createCategoryProduct(input: Partial<CategoryProductModel>) {
        const newCategory = await CategoryProductModel.create(input);
        await RedisHelper.delKeysByPattern(`categories:*`);
        return newCategory;
    }

    static async updateCategoryProduct(id: number, input: Partial<CategoryProductModel>) {
        const updatedCategory = await CategoryProductModel.updateById(id, input);
        if (updatedCategory) {
            const cacheKey = `category_product:${id}`;
            await RedisHelper.set(cacheKey, updatedCategory);
            await RedisHelper.delKeysByPattern(`categories:*`);
        }
        return updatedCategory;
    }

    static async deleteCategoryProduct(id: number) {
        const deletedRows = await CategoryProductModel.deleteById(id);
        if (deletedRows > 0) {
            const cacheKey = `category_product:${id}`;
            await RedisHelper.del(cacheKey);
            await RedisHelper.delKeysByPattern(`categories:*`);
        }
        return deletedRows > 0;
    }
}