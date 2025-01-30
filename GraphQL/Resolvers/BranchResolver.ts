import { BranchController } from '../../Controllers/BranchController';
import { BranchModel } from '../../Models/BranchModel';
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';
import { GraphQLError } from 'graphql';

export const BranchResolver = {
    Query: {
        getBranchById: async (_: any, { id }: { id: number }) => {
            return await BranchController.getBranchById(id);
        },

        getAllBranches: async () => {
            return await BranchController.getAllBranches();
        },

        getUbicationByBranchId: async (_: any, { branchId }: { branchId: number }) => {
            return await BranchController.getUbicationByBranchId(branchId);
        },
    },

    Mutation: {
        createBranch: async (_: any, { input }: { input: Partial<BranchModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await BranchController.createBranch(input);
        },

        updateBranch: async (_: any, { id, input }: { id: number; input: Partial<BranchModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await BranchController.updateBranch(id, input);
        },

        deleteBranch: async (_: any, { id }: { id: number }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']); 
            return await BranchController.deleteBranch(id);
        },
    },

    Branch: {
        id: (parent: BranchModel, _: any, context: CustomContext) => {
            try {
                authorizeRoles(context, ['Admin']);
                return parent.id;
            } catch {
                throw new GraphQLError('Access denied: You do not have permission to see the ID');
            }
        },
    },
};