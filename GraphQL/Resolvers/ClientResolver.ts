import { ClientController } from '../../Controllers/ClientController';
import { ClientModel } from '../../Models/ClientModel';
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles } from '../../Utils/AuthUtils';
import { GraphQLError } from 'graphql';

export const ClientResolver = {
    Query: {
        getClientById: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin', 'Client']);
            return await ClientController.getClientById(id);
        },

        getAllClients: async (context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await ClientController.getAllClients();
        },
    },

    Mutation: {
        createClient: async (_: any, { input }: { input: Partial<ClientModel> }) => {
            return await ClientController.createClient(input);
        },

        updateClient: async (_: any, { id, input }: { id: number; input: Partial<ClientModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin', 'Client']);
            return await ClientController.updateClient(id, input);
        },

        deleteClient: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin', 'Client']);
            return await ClientController.deleteClient(id);
        },
    },

    Client: {
        id: (parent: ClientModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.id;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the ID');
            }
        },
        role: (parent: ClientModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.role;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the role');
            }
        },
    },
};