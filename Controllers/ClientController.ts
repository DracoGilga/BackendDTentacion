import { ClientModel } from "../Models/ClientModel";
import { RedisHelper } from "../Utils/RedisHelper";

export class ClientController {
    static async getClientById(id: number) {
        const cacheKey = `client:${id}`;
        const cachedClient = await RedisHelper.get(cacheKey);

        if (cachedClient) 
            return cachedClient;

        const client = await ClientModel.findById(id);

        if (client)
            await RedisHelper.set(cacheKey, client);

        return client;
    }

    static async getAllClients() {
        const cacheKey = `clients:all`;
        const cachedClients = await RedisHelper.get(cacheKey);

        if (cachedClients) 
            return cachedClients;

        const clients = await ClientModel.findAll();

        if (clients.length > 0)
            await RedisHelper.set(cacheKey, clients);

        return clients;
    }

    static async createClient(input: Partial<ClientModel>) {
        const newClient = await ClientModel.create(input);

        // Clear related cache
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