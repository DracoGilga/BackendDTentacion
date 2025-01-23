import { ClientModel } from "../Models/ClientModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class ClientController {
    static async getClientById(id: number) {
        const cacheKey = `client:${id}`;
        return await RedisHelper.getOrCreate<ClientModel | null>(
            cacheKey,
            async () => await ClientModel.findById(id)
        );
    }

    static async getAllClients() {
        const cacheKey = `clients:all`;
        return await RedisHelper.getOrCreate<ClientModel[]>(
            cacheKey,
            async () => await ClientModel.findAll()
        );
    }

    static async createClient(input: Partial<ClientModel>) {
        const newClient = await ClientModel.create(input);
        await RedisHelper.delKeysByPattern(`clients:*`);
        return newClient;
    }

    static async updateClient(id: number, input: Partial<ClientModel>) {
        const updatedClient = await ClientModel.updateById(id, input);
        if (updatedClient) {
            const cacheKey = `client:${id}`;
            await RedisHelper.set(cacheKey, updatedClient);
            await RedisHelper.delKeysByPattern(`clients:*`);
        }
        return updatedClient;
    }

    static async deleteClient(id: number) {
        const deletedRows = await ClientModel.deleteById(id);
        if (deletedRows > 0) {
            const cacheKey = `client:${id}`;
            await RedisHelper.del(cacheKey);
            await RedisHelper.delKeysByPattern(`clients:*`);
        }
        return deletedRows > 0;
    }
}