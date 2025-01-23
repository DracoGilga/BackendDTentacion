import { ProductModel } from "../Models/ProductModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class ProductController {
    static async getProductById(id: number) {
        const cacheKey = `product:${id}`;
        return RedisHelper.getOrCreate<ProductModel | null>(
            cacheKey,
            async () => ProductModel.findById(id)
        );
    }

    static async getAllProducts() {
        const cacheKey = `products:all`;
        return RedisHelper.getOrCreate<ProductModel[]>(
            cacheKey,
            async () => ProductModel.findAll()
        );
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
        return RedisHelper.getOrCreate<any>(
            cacheKey,
            async () => ProductModel.getCategoryByProductId(productId)
        );
    }

    static async getIngredientsByProductId(productId: number) {
        const cacheKey = `product:${productId}:ingredients`;
        return RedisHelper.getOrCreate<any[]>(
            cacheKey,
            async () => ProductModel.getIngredientsByProductId(productId)
        );
    }
}