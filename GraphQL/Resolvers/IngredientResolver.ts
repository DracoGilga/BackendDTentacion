import { IngredientController } from "../../Controllers/IngredientController";
import { IngredientModel } from "../../Models/IngredientModel";

export const IngredientResolver = {
    Query: {
        getIngredientById: async (_: any, { id }: { id: number }) => {
            return await IngredientController.getIngredientById(id);
        },

        getAllIngredients: async () => {
            return await IngredientController.getAllIngredients();
        },
    },

    Mutation: {
        createIngredient: async (_: any, { input }: { input: Partial<IngredientModel> }) => {
            return await IngredientController.createIngredient(input);
        },

        updateIngredient: async (_: any, { id, input }: { id: number; input: Partial<IngredientModel> }) => {
            return await IngredientController.updateIngredient(id, input);
        },

        deleteIngredient: async (_: any, { id }: { id: number }) => {
            return await IngredientController.deleteIngredient(id);
        },
    },
};
