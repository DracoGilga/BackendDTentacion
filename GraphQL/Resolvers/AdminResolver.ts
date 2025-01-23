import { AdminModel } from '../../Models/AdminModel';
import { RedisHelper } from '../../Utils/RedisHelper';

export const AdminResolver = {
    Query: {
        getAdminById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `admin:${id}`;
            const cachedAdmin = await RedisHelper.get(cacheKey);

            if (cachedAdmin) 
                return cachedAdmin;

            const admin = await AdminModel.findById(id);

            if (admin)
                await RedisHelper.set(cacheKey, admin);

            return admin;
        },

        getAdminsByFirstName: async (_: any, { firstName }: { firstName: string }) => {
            const cacheKey = `admins:firstname:${firstName}`;
            const cachedAdmins = await RedisHelper.get(cacheKey);

            if (cachedAdmins) 
                return cachedAdmins;

            const admins = await AdminModel.findByFirstName(firstName);

            if (admins.length > 0)
                await RedisHelper.set(cacheKey, admins);

            return admins;
        },
    },

    Mutation: {
        createAdmin: async (_: any, { input }: { input: Partial<AdminModel> }) => {
            const newAdmin = await AdminModel.create(input);

            await RedisHelper.delKeysByPattern('admins:*');

            return newAdmin;
        },

        updateAdmin: async (_: any, { id, input }: { id: number; input: Partial<AdminModel> }) => {
            const updatedAdmin = await AdminModel.updateById(id, input);

            if (updatedAdmin) {
                const cacheKey = `admin:${id}`;
                await RedisHelper.set(cacheKey, updatedAdmin);
                await RedisHelper.delKeysByPattern('admins:*');
            }

            return updatedAdmin;
        },

        deleteAdmin: async (_: any, { id }: { id: number }) => {
            const deletedRows = await AdminModel.deleteById(id);

            if (deletedRows > 0) {
                const cacheKey = `admin:${id}`;
                await RedisHelper.del(cacheKey);
                await RedisHelper.delKeysByPattern('admins:*');
            }

            return deletedRows > 0;
        },
    },
};
