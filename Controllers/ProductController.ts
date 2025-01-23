import { ProductModel } from "../Models/ProductModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class ProductController {
    static async getProductById(id: number) {
        const cacheKey = `product:${id}`;
        const cachedProduct = await RedisHelper.get(cacheKey);

        if (cachedProduct) 
            return cachedProduct;

        const product = await ProductModel.findById(id);

        if (product) 
            await RedisHelper.set(cacheKey, product);

        return product;
    }

    static async getAllProducts() {
        const cacheKey = `products:all`;
        const cachedProducts = await RedisHelper.get(cacheKey);

        if (cachedProducts) 
            return cachedProducts;

        const products = await ProductModel.findAll();

        if (products.length > 0) 
            await RedisHelper.set(cacheKey, products);

        return products;
    }

    static async createProduct(input: Partial<ProductModel>) {
        const newProduct = await ProductModel.create(input);
        await RedisHelper.delKeysByPattern(`products:*`);
        return newProduct;
    }

    static async updateProduct(id: number, input: Partial<ProductModel>) {
        const updatedProduct = await ProductModel.updateById(id, input);

        if (updatedProduct) {
            await RedisHelper.set(`product:${id}`, updatedProduct);
            await RedisHelper.delKeysByPattern(`products:*`);
        }

        return updatedProduct;
    }

    static async deleteProduct(id: number) {
        const deletedRows = await ProductModel.deleteById(id);

        if (deletedRows > 0) {
            await RedisHelper.del(`product:${id}`);
            await RedisHelper.delKeysByPattern(`products:*`);
        }

        return deletedRows > 0;
    }

    static async getCategoryByProductId(productId: number) {
        const cacheKey = `product:${productId}:category`;
        const cachedCategory = await RedisHelper.get(cacheKey);

        if (cachedCategory) 
            return cachedCategory;

        const category = await ProductModel.getCategoryByProductId(productId);

        if (category) 
            await RedisHelper.set(cacheKey, category);

        return category;
    }

    static async getIngredientsByProductId(productId: number) {
        const cacheKey = `product:${productId}:ingredients`;
        const cachedIngredients = await RedisHelper.get(cacheKey);

        if (cachedIngredients) 
            return cachedIngredients;

        const ingredients = await ProductModel.getIngredientsByProductId(productId);

        if (ingredients.length > 0) 
            await RedisHelper.set(cacheKey, ingredients);

        return ingredients;
    }
}