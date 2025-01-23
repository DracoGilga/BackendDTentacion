import { ClientModel } from '../../Models/ClientModel';
import { RedisHelper } from '../../Utils/RedisHelper';

export const ClientResolver = {
    Query: {
        getClientById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `client:${id}`;
            const cachedClient = await RedisHelper.get(cacheKey);

            if (cachedClient) 
                return cachedClient;

            const client = await ClientModel.findById(id);

            if (client)
                await RedisHelper.set(cacheKey, client);

            return client;
        },

        getAllClients: async () => {
            const cacheKey = `clients:all`;
            const cachedClients = await RedisHelper.get(cacheKey);

            if (cachedClients) 
                return cachedClients;

            const clients = await ClientModel.findAll();

            if (clients.length > 0)
                await RedisHelper.set(cacheKey, clients);

            return clients;
        },
    },

    Mutation: {
        createClient: async (_: any, { input }: { input: Partial<ClientModel> }) => {
            const newClient = await ClientModel.create(input);

            await RedisHelper.delKeysByPattern(`clients:*`);

            return newClient;
        },

        updateClient: async (_: any, { id, input }: { id: number; input: Partial<ClientModel> }) => {
            const updatedClient = await ClientModel.updateById(id, input);

            if (updatedClient) {
                await RedisHelper.set(`client:${id}`, updatedClient);
                await RedisHelper.delKeysByPattern(`clients:*`);
            }

            return updatedClient;
        },

        deleteClient: async (_: any, { id }: { id: number }) => {
            const deletedRows = await ClientModel.deleteById(id);

            if (deletedRows > 0) {
                await RedisHelper.del(`client:${id}`);
                await RedisHelper.delKeysByPattern(`clients:*`);
            }

            return deletedRows > 0;
        },
    },
};