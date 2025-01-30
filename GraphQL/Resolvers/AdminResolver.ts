import { AdminController } from '../../Controllers/AdminController';
import { AdminModel } from '../../Models/AdminModel';
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';

export const AdminResolver = {
    Query: {
        getAdminById: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await AdminController.getAdminById(id);
        },

        getAdminsByFirstName: async (_: any, { firstName }: { firstName: string }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await AdminController.getAdminsByFirstName(firstName);
        },
    },

    Mutation: {
        createAdmin: async (_: any, { input }: { input: Partial<AdminModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await AdminController.createAdmin(input);
        },

        updateAdmin: async (_: any, { id, input }: { id: number; input: Partial<AdminModel> }) => {
            return await AdminController.updateAdmin(id, input);
        },

        deleteAdmin: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await AdminController.deleteAdmin(id);
        },
    },
};