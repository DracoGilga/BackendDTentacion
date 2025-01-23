import { BranchModel } from '../Models/BranchModel';
import { OrderModel } from '../Models/OrderModel';
import { UbicationModel } from '../Models/UbicationModel';

export class BranchController {
    static async getBranchById(id: number) {
        return await BranchModel.findById(id);
    }

    static async getAllBranches() {
        return await BranchModel.findAll();
    }

    static async getOrdersByBranchId(branchId: number): Promise<OrderModel[]> {
        return await BranchModel.getOrdersByBranchId(branchId);
    }

    static async getUbicationByBranchId(branchId: number): Promise<UbicationModel | null> {
        return await BranchModel.getUbicationByBranchId(branchId);
    }

    static async createBranch(input: Partial<BranchModel>) {
        return await BranchModel.create(input);
    }

    static async updateBranch(id: number, input: Partial<BranchModel>) {
        return await BranchModel.updateById(id, input);
    }

    static async deleteBranch(id: number): Promise<boolean> {
        const deletedRows = await BranchModel.deleteById(id);
        return deletedRows > 0;
    }
}