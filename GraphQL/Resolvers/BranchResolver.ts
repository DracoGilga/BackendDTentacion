import { BranchModel } from '../Models/BranchModel';
import { OrderEntity } from '../Entities/OrderEntity';
import { UbicationEntity } from '../Entities/UbicationEntity';

export const BranchResolver = {
    Query: {
        getBranchById: async (_: any, { id }: { id: number }) => {
            return await BranchModel.findById(id);
        },
        getAllBranches: async () => {
            return await BranchModel.findAll();
        },
        getOrdersByBranchId: async (_: any, { branchId }: { branchId: number }) => {
            return await BranchModel.getOrdersByBranchId(branchId);
        },
        getUbicationByBranchId: async (_: any, { branchId }: { branchId: number }) => {
            return await BranchModel.getUbicationByBranchId(branchId);
        },
    },
    Mutation: {
        createBranch: async (_: any, { input }: { input: Partial<BranchModel> }) => {
            return await BranchModel.create(input);
        },
        updateBranch: async (_: any, { id, input }: { id: number; input: Partial<BranchModel> }) => {
            return await BranchModel.updateById(id, input);
        },
        deleteBranch: async (_: any, { id }: { id: number }) => {
            const deletedRows = await BranchModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};