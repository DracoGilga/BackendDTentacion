import { AdminModel } from '../Models/AdminModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class AdminController {
    static async getAdminById(id: number) {
        const cacheKey = `admin:${id}`;

        return await RedisHelper.getOrCreate<AdminModel | null>(cacheKey, async () => {
            return await AdminModel.findById(id);
        });
    }

    static async getAdminsByFirstName(firstName: string) {
        const cacheKey = `admins:firstname:${firstName}`;

        return await RedisHelper.getOrCreate<AdminModel[]>(cacheKey, async () => {
            return await AdminModel.findByFirstName(firstName);
        });
    }

    static async createAdmin(input: Partial<AdminModel>) {
        const newAdmin = await AdminModel.create(input);

        await RedisHelper.delKeysByPattern('admins:*');

        return newAdmin;
    }

    static async updateAdmin(id: number, input: Partial<AdminModel>) {
        const updatedAdmin = await AdminModel.updateById(id, input);

        if (updatedAdmin) {
            const cacheKey = `admin:${id}`;
            await RedisHelper.set(cacheKey, updatedAdmin);
            await RedisHelper.delKeysByPattern('admins:*');
        }

        return updatedAdmin;
    }

    static async deleteAdmin(id: number) {
        const deletedRows = await AdminModel.deleteById(id);

        if (deletedRows > 0) {
            const cacheKey = `admin:${id}`;
            await RedisHelper.del(cacheKey);
            await RedisHelper.delKeysByPattern('admins:*');
        }

        return deletedRows > 0;
    }
}