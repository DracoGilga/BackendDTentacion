import { AdminModel } from '../Models/AdminModel';

export const AdminResolver = {
    Query: {
        getAdminById: async (_: any, { id }: { id: number }) => {
            return await AdminModel.findById(id);
        },
        getAdminsByFirstName: async (_: any, { firstName }: { firstName: string }) => {
            return await AdminModel.findByFirstName(firstName);
        },
    },
    Mutation: {
        createAdmin: async (_: any, { input }: { input: Partial<AdminModel> }) => {
            return await AdminModel.create(input);
        },
        updateAdmin: async (_: any, { id, input }: { id: number; input: Partial<AdminModel> }) => {
            return await AdminModel.updateById(id, input);
        },
        deleteAdmin: async (_: any, { id }: { id: number }) => {
            const deletedRows = await AdminModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};