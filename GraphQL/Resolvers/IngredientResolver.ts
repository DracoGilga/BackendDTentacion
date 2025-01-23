import { IngredientModel } from '../Models/IngredientModel';
import { RedisHelper } from '../Utils/RedisHelper';

export const IngredientResolver = {
    Query: {
        getIngredientById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `ingredient:${id}`;
            const cachedIngredient = await RedisHelper.get(cacheKey);

            if (cachedIngredient) 
                return cachedIngredient;

            const ingredient = await IngredientModel.findById(id);

            if (ingredient) 
                await RedisHelper.set(cacheKey, ingredient);

            return ingredient;
        },

        getAllIngredients: async () => {
            const cacheKey = `ingredients:all`;
            const cachedIngredients = await RedisHelper.get(cacheKey);
            
            if (cachedIngredients) 
                return cachedIngredients;

            const ingredients = await IngredientModel.findAll();

            if (ingredients.length > 0) 
                await RedisHelper.set(cacheKey, ingredients);
            
            return ingredients;
        },
    },

    Mutation: {
        createIngredient: async (_: any, { input }: { input: Partial<IngredientModel> }) => {
            const newIngredient = await IngredientModel.create(input);
            await RedisHelper.delKeysByPattern(`ingredients:*`);
            return newIngredient;
        },

        updateIngredient: async (_: any, { id, input }: { id: number; input: Partial<IngredientModel> }) => {
            const updatedIngredient = await IngredientModel.updateById(id, input);
            
            if (updatedIngredient) {
                const cacheKey = `ingredient:${id}`;
                await RedisHelper.set(cacheKey, updatedIngredient);
                await RedisHelper.delKeysByPattern(`ingredients:*`);
            }

            return updatedIngredient;
        },

        deleteIngredient: async (_: any, { id }: { id: number }) => {
            const deletedRows = await IngredientModel.deleteById(id);
            
            if (deletedRows > 0) {
                const cacheKey = `ingredient:${id}`;
                await RedisHelper.del(cacheKey);
                await RedisHelper.delKeysByPattern(`ingredients:*`);
            }
            
            return deletedRows > 0;
        },
    },
};