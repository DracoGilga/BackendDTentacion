import { AdminController } from '../../Controllers/AdminController';
import { AdminModel } from '../../Models/AdminModel';

export const AdminResolver = {
    Query: {
        getAdminById: async (_: any, { id }: { id: number }) => {
            return await AdminController.getAdminById(id);
        },

        getAdminsByFirstName: async (_: any, { firstName }: { firstName: string }) => {
            return await AdminController.getAdminsByFirstName(firstName);
        },
    },

    Mutation: {
        createAdmin: async (_: any, { input }: { input: Partial<AdminModel> }) => {
            return await AdminController.createAdmin(input);
        },

        updateAdmin: async (_: any, { id, input }: { id: number; input: Partial<AdminModel> }) => {
            return await AdminController.updateAdmin(id, input);
        },

        deleteAdmin: async (_: any, { id }: { id: number }) => {
            return await AdminController.deleteAdmin(id);
        },
    },
};