import { ProductController } from "../../Controllers/ProductController";
import { ProductModel } from "../../Models/ProductModel";
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';
import { GraphQLError } from 'graphql';

export const ProductResolver = {
    Query: {
        getProductById: async (_: any, { id }: { id: number }) => {
            return await ProductController.getProductById(id);
        },
        getAllProducts: async () => {
            return await ProductController.getAllProducts();
        },
    },

    Mutation: {
        createProduct: async (_: any, { input }: { input: Partial<ProductModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await ProductController.createProduct(input);
        },
        updateProduct: async (_: any, { id, input }: { id: number; input: Partial<ProductModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await ProductController.updateProduct(id, input);
        },
        deleteProduct: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await ProductController.deleteProduct(id);
        },
    },

    Product: {
        category: async (product: any) => {
            return await ProductController.getCategoryByProductId(product.id);
        },
        ingredients: async (parent: ProductModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return await ProductController.getIngredientsByProductId(parent.id);
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the ingredients');
            }
        },
        id: (parent: ProductModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.id;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the ID');
            }
        },
        stock: (parent: ProductModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.stock;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the stock');
            }
        },
        expirationDate: (parent: ProductModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.expirationDate;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the expiration date');
            }
        },
    },
};