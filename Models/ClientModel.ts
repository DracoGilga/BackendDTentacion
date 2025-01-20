import { ClientEntity } from "../Entities/ClientEntity";

export class ClientModel {
    static async findById(id: number): Promise<ClientEntity | null> {
        const client = await ClientEntity.query().findById(id);
        return client || null;
    }

    static async findAll(): Promise<ClientEntity[]> {
        return await ClientEntity.query();
    }

    static async create(clientData: Partial<ClientEntity>): Promise<ClientEntity> {
        return await ClientEntity.query().insert(clientData);
    }

    static async updateById(id: number, updateData: Partial<ClientEntity>): Promise<ClientEntity | null> {
        return await ClientEntity.query().patchAndFetchById(id, updateData);
    }

    static async deleteById(id: number): Promise<number> {
        return await ClientEntity.query().deleteById(id);
    }
}