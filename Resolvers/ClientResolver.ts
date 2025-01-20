import { ClientModel } from '../Models/ClientModel';

export const ClientResolver = {
    Query: {
        getClientById: async (_: any, { id }: { id: number }) => {
            return await ClientModel.findById(id);
        },
        getAllClients: async () => {
            return await ClientModel.findAll();
        },
    },
    Mutation: {
        createClient: async (_: any, { input }: { input: Partial<ClientModel> }) => {
            return await ClientModel.create(input);
        },
        updateClient: async (_: any, { id, input }: { id: number; input: Partial<ClientModel> }) => {
            return await ClientModel.updateById(id, input);
        },
        deleteClient: async (_: any, { id }: { id: number }) => {
            const deletedRows = await ClientModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};