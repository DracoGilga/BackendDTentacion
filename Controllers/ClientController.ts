import { ClientModel } from "../Models/ClientModel";
import { RedisHelper } from "../Utils/RedisHelper";
import { EncryptionUtils } from '../Utils/EncryptionUtils';

export class ClientController {
    static async getClientById(id: number) {
        const cacheKey = `client:${id}`;

        return await RedisHelper.getOrCreate<ClientModel | null>(cacheKey, async () => {
            const client = await ClientModel.findById(id);
            if (client) {
                client.email = EncryptionUtils.decryptData(client.email);
            }
            return client;
        });
    }

    static async getAllClients() {
        const cacheKey = `clients:all`;

        return await RedisHelper.getOrCreate<ClientModel[]>(cacheKey, async () => {
            const clients = await ClientModel.findAll();
            clients.forEach((client) => {
                client.email = EncryptionUtils.decryptData(client.email);
            });
            return clients;
        });
    }

    static async createClient(input: Partial<ClientModel>) {
        input.password = await EncryptionUtils.hashPassword(input.password!);
        input.email = EncryptionUtils.encryptData(input.email!);

        const newClient = await ClientModel.create(input);
        await RedisHelper.delKeysByPattern(`clients:*`);
        return newClient;
    }

    static async updateClient(id: number, input: Partial<ClientModel>) {
        if (input.password)
            input.password = await EncryptionUtils.hashPassword(input.password!);
        if (input.email)
            input.email = EncryptionUtils.encryptData(input.email!);

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