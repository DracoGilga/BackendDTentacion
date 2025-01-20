import { ProductModel } from '../Models/ProductModel';

export const ProductResolver = {
    Query: {
        getProductById: async (_: any, { id }: { id: number }) => {
            return await ProductModel.findById(id);
        },
        getAllProducts: async () => {
            return await ProductModel.findAll();
        },
    },
    Mutation: {
        createProduct: async (_: any, { input }: { input: Partial<ProductModel> }) => {
            return await ProductModel.create(input);
        },
        updateProduct: async (_: any, { id, input }: { id: number; input: Partial<ProductModel> }) => {
            return await ProductModel.updateById(id, input);
        },
        deleteProduct: async (_: any, { id }: { id: number }) => {
            const deletedRows = await ProductModel.deleteById(id);
            return deletedRows > 0;
        },
    },
    Product: {
        category: async (product: any) => {
            return await ProductModel.getCategoryByProductId(product.id);
        },
        ingredients: async (product: any) => {
            return await ProductModel.getIngredientsByProductId(product.id);
        },
    },
};