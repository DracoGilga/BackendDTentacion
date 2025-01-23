import { IngredientModel } from "../Models/IngredientModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class IngredientController {
    static async getIngredientById(id: number) {
        const cacheKey = `ingredient:${id}`;
        const cachedIngredient = await RedisHelper.get(cacheKey);

        if (cachedIngredient) 
            return cachedIngredient;

        const ingredient = await IngredientModel.findById(id);

        if (ingredient) 
            await RedisHelper.set(cacheKey, ingredient);

        return ingredient;
    }

    static async getAllIngredients() {
        const cacheKey = `ingredients:all`;
        const cachedIngredients = await RedisHelper.get(cacheKey);
        
        if (cachedIngredients) 
            return cachedIngredients;

        const ingredients = await IngredientModel.findAll();

        if (ingredients.length > 0) 
            await RedisHelper.set(cacheKey, ingredients);

        return ingredients;
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