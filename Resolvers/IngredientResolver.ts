import { IngredientModel } from '../Models/IngredientModel';

export const IngredientResolver = {
    Query: {
        getIngredientById: async (_: any, { id }: { id: number }) => {
            return await IngredientModel.findById(id);
        },
        getAllIngredients: async () => {
            return await IngredientModel.findAll();
        },
    },
    Mutation: {
        createIngredient: async (_: any, { input }: { input: Partial<IngredientModel> }) => {
            return await IngredientModel.create(input);
        },
        updateIngredient: async (_: any, { id, input }: { id: number; input: Partial<IngredientModel> }) => {
            return await IngredientModel.updateById(id, input);
        },
        deleteIngredient: async (_: any, { id }: { id: number }) => {
            const deletedRows = await IngredientModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};