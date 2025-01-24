import { BranchModel } from '../Models/BranchModel';
import { UbicationModel } from '../Models/UbicationModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class BranchController {
    static async getBranchById(id: number) {
        const cacheKey = `branch:${id}`;

        return await RedisHelper.getOrCreate<BranchModel | null>(cacheKey, async () => {
            return await BranchModel.findById(id);
        });
    }

    static async getAllBranches() {
        const cacheKey = 'branches:all';

        return await RedisHelper.getOrCreate<BranchModel[]>(cacheKey, async () => {
            return await BranchModel.findAll();
        });
    }

    static async getUbicationByBranchId(branchId: number): Promise<UbicationModel | null> {
        const cacheKey = `ubication:branch:${branchId}`;

        return await RedisHelper.getOrCreate<UbicationModel | null>(cacheKey, async () => {
            return await BranchModel.getUbicationByBranchId(branchId);
        });
    }

    static async createBranch(input: Partial<BranchModel>) {
        const newBranch = await BranchModel.create(input);

        await RedisHelper.delKeysByPattern('branches:*');

        return newBranch;
    }

    static async updateBranch(id: number, input: Partial<BranchModel>) {
        const updatedBranch = await BranchModel.updateById(id, input);

        if (updatedBranch) {
            const cacheKey = `branch:${id}`;

            await RedisHelper.set(cacheKey, updatedBranch);
            await RedisHelper.delKeysByPattern('branches:*');
        }

        return updatedBranch;
    }

    static async deleteBranch(id: number): Promise<boolean> {
        const deletedRows = await BranchModel.deleteById(id);

        if (deletedRows > 0) {
            const cacheKey = `branch:${id}`;
            
            await RedisHelper.del(cacheKey);
            await RedisHelper.delKeysByPattern('branches:*');
        }

        return deletedRows > 0;
    }
}