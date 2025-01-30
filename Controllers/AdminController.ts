import { AdminModel } from '../Models/AdminModel';
import { RedisHelper } from '../Utils/RedisHelper';
import { EncryptionUtils } from '../Utils/EncryptionUtils';

export class AdminController {
    static async getAdminById(id: number) {
        const cacheKey = `admin:${id}`;

        return await RedisHelper.getOrCreate<AdminModel | null>(cacheKey, async () => {
            const admin = await AdminModel.findById(id);
            
            if (admin) 
                admin.phone = EncryptionUtils.decryptData(admin.phone);

            return admin;
        });
    }

    static async getAdminsByFirstName(firstName: string) {
        const cacheKey = `admins:firstname:${firstName}`;

        return await RedisHelper.getOrCreate<AdminModel[]>(cacheKey, async () => {
            const admins = await AdminModel.findByFirstName(firstName);

            admins.forEach((admin) => {
                admin.phone = EncryptionUtils.decryptData(admin.phone);
            });

            return admins;
        });
    }

    static async createAdmin(input: Partial<AdminModel>) {
        input.password = await EncryptionUtils.hashPassword(input.password!);
        input.phone = EncryptionUtils.encryptData(input.phone!);

        const newAdmin = await AdminModel.create(input);

        await RedisHelper.delKeysByPattern('admins:*');

        return newAdmin;
    }

    static async updateAdmin(id: number, input: Partial<AdminModel>) {
        if (input.password)
            input.password = await EncryptionUtils.hashPassword(input.password!);
        if (input.phone) 
            input.phone = EncryptionUtils.encryptData(input.phone!);

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