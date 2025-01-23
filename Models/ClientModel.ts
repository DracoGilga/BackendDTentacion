import { Model } from 'objection';

export class ClientModel extends Model {
    static tableName = 'clients'; 

    id!: number;
    name!: string;
    lastName!: string;
    phone!: string;
    birthDate!: Date;
    email!: string;
    password!: string;
    role!: string;

    static async findById(id: number): Promise<ClientModel | null> {
        return await this.query().findById(id) || null;
    }

    static async findAll(): Promise<ClientModel[]> {
        return await this.query();
    }

    static async create(clientData: Partial<ClientModel>): Promise<ClientModel> {
        return await this.query().insert(clientData);
    }

    static async updateById(id: number, updateData: Partial<ClientModel>): Promise<ClientModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }

    static async login(phone: string, password: string): Promise<ClientModel | null> {
        const client = await this.query().where('phone', phone).first();

        if (client && client.password === password)
            return client;

        return null;
    }
}