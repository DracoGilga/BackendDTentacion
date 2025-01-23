import { CategoryProductModel } from '../Models/CategoryProductModel';
import { RedisHelper } from '../Utils/RedisHelper';

export const CategoryProductResolver = {
    Query: {
        getCategoryProductById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `category_product:${id}`;
            const cachedCategory = await RedisHelper.get(cacheKey);

            if (cachedCategory) 
                return cachedCategory;

            const category = await CategoryProductModel.findById(id);

            if (category)
                await RedisHelper.set(cacheKey, category);

            return category;
        },

        getAllCategoryProducts: async () => {
            const cacheKey = `categories:all`;
            const cachedCategories = await RedisHelper.get(cacheKey);

            if (cachedCategories) 
                return cachedCategories;
            
            const categories = await CategoryProductModel.findAll();

            if (categories.length > 0)
                await RedisHelper.set(cacheKey, categories);

            return categories;
        },
    },

    Mutation: {
        createCategoryProduct: async (_: any, { input }: { input: Partial<CategoryProductModel> }) => {
            const newCategory = await CategoryProductModel.create(input);

            await RedisHelper.delKeysByPattern(`categories:*`);

            return newCategory;
        },

        updateCategoryProduct: async (_: any, { id, input }: { id: number; input: Partial<CategoryProductModel> }) => {
            const updatedCategory = await CategoryProductModel.updateById(id, input);

            if (updatedCategory) {
                await RedisHelper.set(`category_product:${id}`, updatedCategory);
                await RedisHelper.delKeysByPattern(`categories:*`);
            }

            return updatedCategory;
        },

        deleteCategoryProduct: async (_: any, { id }: { id: number }) => {
            const deletedRows = await CategoryProductModel.deleteById(id);

            if (deletedRows > 0) {
                await RedisHelper.del(`category_product:${id}`);
                await RedisHelper.delKeysByPattern(`categories:*`);
            }

            return deletedRows > 0;
        },
    },
};