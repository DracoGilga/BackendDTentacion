import { Model } from 'objection';

export class AdminModel extends Model {
    static tableName = 'admins';

    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    phone!: string;
    role!: string;

    static async findById(id: number): Promise<AdminModel | null> {
        return await this.query().findById(id) || null;
    }

    static async create(adminData: Partial<AdminModel>): Promise<AdminModel> {
        return await this.query().insert(adminData);
    }

    static async updateById(id: number, updateData: Partial<AdminModel>): Promise<AdminModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }

    static async findByFirstName(firstName: string): Promise<AdminModel[]> {
        return await this.query().where('firstName', firstName);
    }

    static async login(username: string, password: string): Promise<AdminModel | null> {
        const admin = await this.query().where('username', username).first();
        return admin && admin.password === password ? admin : null;
    }
}