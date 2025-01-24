import { BranchController } from '../../Controllers/BranchController';
import { BranchModel } from '../../Models/BranchModel';

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
        createBranch: async (_: any, { input }: { input: Partial<BranchModel> }) => {
            return await BranchController.createBranch(input);
        },

        updateBranch: async (_: any, { id, input }: { id: number; input: Partial<BranchModel> }) => {
            return await BranchController.updateBranch(id, input);
        },

        deleteBranch: async (_: any, { id }: { id: number }) => {
            return await BranchController.deleteBranch(id);
        },
    },
};