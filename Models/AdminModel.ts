import { AdminEntity } from '../Entities/AdminEntity';

export class AdminModel {
    static async findById(id: number): Promise<AdminEntity | null> {
        const admin = await AdminEntity.query().findById(id);
        return admin || null;
    }

    static async create(adminData: Partial<AdminEntity>): Promise<AdminEntity> {
        return await AdminEntity.query().insert(adminData);
    }

    static async updateById(id: number, updateData: Partial<AdminEntity>): Promise<AdminEntity | null> {
        const updatedAdmin = await AdminEntity.query().patchAndFetchById(id, updateData);
        return updatedAdmin || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await AdminEntity.query().deleteById(id);
    }

    static async findByFirstName(firstName: string): Promise<AdminEntity[]> {
        return await AdminEntity.query().where('firstName', firstName);
    }
}