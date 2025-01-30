import { UbicationController } from "../../Controllers/UbicationController";
import { UbicationModel } from "../../Models/UbicationModel";
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils'

export const UbicationResolver = {
    Query: {
        getUbicationById: async (_: any, { id }: { id: number }) => {
            return await UbicationController.getUbicationById(id);
        },

        getAllUbications: async () => {
            return await UbicationController.getAllUbications();
        },
    },

    Mutation: {
        createUbication: async (_: any, { input }: { input: Partial<UbicationModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await UbicationController.createUbication(input);
        },

        updateUbication: async (_: any, { id, input }: { id: number; input: Partial<UbicationModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await UbicationController.updateUbication(id, input);
        },

        deleteUbication: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await UbicationController.deleteUbication(id);
        },
    },
};