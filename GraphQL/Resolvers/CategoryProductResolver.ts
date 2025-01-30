import { CategoryProductController } from '../../Controllers/CategoryProductController';
import { CategoryProductModel } from '../../Models/CategoryProductModel';
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';

export const CategoryProductResolver = {
    Query: {
        getCategoryProductById: async (_: any, { id }: { id: number }) => {
            return await CategoryProductController.getCategoryProductById(id);
        },

        getAllCategoryProducts: async () => {
            return await CategoryProductController.getAllCategoryProducts();
        },
    },

    Mutation: {
        createCategoryProduct: async (_: any, { input }: { input: Partial<CategoryProductModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await CategoryProductController.createCategoryProduct(input);
        },

        updateCategoryProduct: async (_: any, { id, input }: { id: number; input: Partial<CategoryProductModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await CategoryProductController.updateCategoryProduct(id, input);
        },

        deleteCategoryProduct: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await CategoryProductController.deleteCategoryProduct(id);
        },
    },
};