import { ProductModel } from '../Models/ProductModel';
import { RedisHelper } from '../Utils/RedisHelper';

export const ProductResolver = {
    Query: {
        getProductById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `product:${id}`;
            const cachedProduct = await RedisHelper.get(cacheKey);

            if (cachedProduct)
                return cachedProduct;

            const product = await ProductModel.findById(id);

            if (product) 
                await RedisHelper.set(cacheKey, product);

            return product;
        },

        getAllProducts: async () => {
            const cacheKey = `products:all`;
            const cachedProducts = await RedisHelper.get(cacheKey);

            if (cachedProducts)
                return cachedProducts;

            const products = await ProductModel.findAll();

            if (products.length > 0) 
                await RedisHelper.set(cacheKey, products);

            return products;
        },
    },

    Mutation: {
        createProduct: async (_: any, { input }: { input: Partial<ProductModel> }) => {
            const newProduct = await ProductModel.create(input);

            await RedisHelper.delKeysByPattern(`products:*`);

            return newProduct;
        },

        updateProduct: async (_: any, { id, input }: { id: number; input: Partial<ProductModel> }) => {
            const updatedProduct = await ProductModel.updateById(id, input);

            if (updatedProduct) {
                await RedisHelper.set(`product:${id}`, updatedProduct);
                await RedisHelper.delKeysByPattern(`products:*`);
            }

            return updatedProduct;
        },

        deleteProduct: async (_: any, { id }: { id: number }) => {
            const deletedRows = await ProductModel.deleteById(id);

            if (deletedRows > 0) {
                await RedisHelper.del(`product:${id}`);
                await RedisHelper.delKeysByPattern(`products:*`);
            }

            return deletedRows > 0;
        },
    },

    Product: {
        category: async (product: any) => {
            const cacheKey = `product:${product.id}:category`;
            const cachedCategory = await RedisHelper.get(cacheKey);

            if (cachedCategory)
                return cachedCategory;

            const category = await ProductModel.getCategoryByProductId(product.id);

            if (category) 
                await RedisHelper.set(cacheKey, category);

            return category;
        },

        ingredients: async (product: any) => {
            const cacheKey = `product:${product.id}:ingredients`;
            const cachedIngredients = await RedisHelper.get(cacheKey);

            if (cachedIngredients)
                return cachedIngredients;

            const ingredients = await ProductModel.getIngredientsByProductId(product.id);

            if (ingredients.length > 0) 
                await RedisHelper.set(cacheKey, ingredients);

            return ingredients;
        },
    },
};