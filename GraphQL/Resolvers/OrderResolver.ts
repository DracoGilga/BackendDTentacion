import { OrderController } from "../../Controllers/OrderController";
import { OrderModel } from "../../Models/OrderModel";
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';
import { GraphQLError } from 'graphql';

export const OrderResolver = {
    Query: {
        getOrderById: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']); 
            return await OrderController.getOrderById(id);
        },
        getAllOrders: async (context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await OrderController.getAllOrders();
        },
    },
    Mutation: {
        createOrder: async (_: any, { input }: { input: Partial<OrderModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']);
            return await OrderController.createOrder(input);
        },
        updateOrder: async (_: any, { id, input }: { id: number; input: Partial<OrderModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await OrderController.updateOrder(id, input);
        },
        deleteOrder: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']);
            return await OrderController.deleteOrder(id);
        },
    },
    Order: {
        client: async (order: any, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']); 
            return await OrderController.getClientByOrderId(order.id);
        },
        products: async (order: any, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']);
            return await OrderController.getProductsByOrderId(order.id);
        },
        branches: async (order: any, context: CustomContext) => {
            authorizeRoles(context, ['Admin','Client']);
            return await OrderController.getBranchByOrderId(order.id);
        },
        id: (parent: OrderModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin','Client']);
                return parent.id;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the ID');
            }
        },
    },
};