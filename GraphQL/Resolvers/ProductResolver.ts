import { ProductController } from "../../Controllers/ProductController";
import { ProductModel } from "../../Models/ProductModel";

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
        createProduct: async (_: any, { input }: { input: Partial<ProductModel> }) => {
            return await ProductController.createProduct(input);
        },
        updateProduct: async (_: any, { id, input }: { id: number; input: Partial<ProductModel> }) => {
            return await ProductController.updateProduct(id, input);
        },
        deleteProduct: async (_: any, { id }: { id: number }) => {
            return await ProductController.deleteProduct(id);
        },
    },

    Product: {
        category: async (product: any) => {
            return await ProductController.getCategoryByProductId(product.id);
        },
        ingredients: async (product: any) => {
            return await ProductController.getIngredientsByProductId(product.id);
        },
    },
};