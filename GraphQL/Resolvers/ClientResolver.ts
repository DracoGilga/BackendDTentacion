import { ClientController } from '../../Controllers/ClientController';
import { ClientModel } from '../../Models/ClientModel';

export const ClientResolver = {
    Query: {
        getClientById: async (_: any, { id }: { id: number }) => {
            return await ClientController.getClientById(id);
        },

        getAllClients: async () => {
            return await ClientController.getAllClients();
        },
    },

    Mutation: {
        createClient: async (_: any, { input }: { input: Partial<ClientModel> }) => {
            return await ClientController.createClient(input);
        },

        updateClient: async (_: any, { id, input }: { id: number; input: Partial<ClientModel> }) => {
            return await ClientController.updateClient(id, input);
        },

        deleteClient: async (_: any, { id }: { id: number }) => {
            return await ClientController.deleteClient(id);
        },
    },
};