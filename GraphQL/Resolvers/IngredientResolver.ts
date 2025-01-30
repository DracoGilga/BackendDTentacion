import { IngredientController } from "../../Controllers/IngredientController";
import { IngredientModel } from "../../Models/IngredientModel";
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';

export const IngredientResolver = {
    Query: {
        getIngredientById: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await IngredientController.getIngredientById(id);
        },

        getAllIngredients: async (context: CustomContext) => {
                    authorizeRoles(context, ['Admin']);
            return await IngredientController.getAllIngredients();
        },
    },

    Mutation: {
        createIngredient: async (_: any, { input }: { input: Partial<IngredientModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await IngredientController.createIngredient(input);
        },

        updateIngredient: async (_: any, { id, input }: { id: number; input: Partial<IngredientModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await IngredientController.updateIngredient(id, input);
        },

        deleteIngredient: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await IngredientController.deleteIngredient(id);
        },
    },
};