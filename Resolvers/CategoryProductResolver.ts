import { CategoryProductModel } from '../Models/CategoryProductModel';

export const CategoryProductResolver = {
    Query: {
        getCategoryProductById: async (_: any, { id }: { id: number }) => {
            return await CategoryProductModel.findById(id);
        },
        getAllCategoryProducts: async () => {
            return await CategoryProductModel.findAll();
        },
    },
    Mutation: {
        createCategoryProduct: async (_: any, { input }: { input: Partial<CategoryProductModel> }) => {
            return await CategoryProductModel.create(input);
        },
        updateCategoryProduct: async (_: any, { id, input }: { id: number; input: Partial<CategoryProductModel> }) => {
            return await CategoryProductModel.updateById(id, input);
        },
        deleteCategoryProduct: async (_: any, { id }: { id: number }) => {
            const deletedRows = await CategoryProductModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};