import { IngredientModel } from "../Models/IngredientModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class IngredientController {
    static async getIngredientById(id: number) {
        const cacheKey = `ingredient:${id}`;
        return RedisHelper.getOrCreate<IngredientModel | null>(
            cacheKey,
            async () => IngredientModel.findById(id)
        );
    }

    static async getAllIngredients() {
        const cacheKey = `ingredients:all`;
        return RedisHelper.getOrCreate<IngredientModel[]>(
            cacheKey,
            async () => IngredientModel.findAll()
        );
    }

    static async createIngredient(input: Partial<IngredientModel>) {
        const newIngredient = await IngredientModel.create(input);
        await RedisHelper.delKeysByPattern(`ingredients:*`);
        return newIngredient;
    }

    static async updateIngredient(id: number, input: Partial<IngredientModel>) {
        const updatedIngredient = await IngredientModel.updateById(id, input);
        if (updatedIngredient) {
            const cacheKey = `ingredient:${id}`;
            await RedisHelper.set(cacheKey, updatedIngredient);
            await RedisHelper.delKeysByPattern(`ingredients:*`);
        }
        return updatedIngredient;
    }

    static async deleteIngredient(id: number) {
        const deletedRows = await IngredientModel.deleteById(id);
        if (deletedRows > 0) {
            const cacheKey = `ingredient:${id}`;
            await RedisHelper.del(cacheKey);
            await RedisHelper.delKeysByPattern(`ingredients:*`);
        }
        return deletedRows > 0;
    }
}