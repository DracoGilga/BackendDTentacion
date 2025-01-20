import { BranchEntity } from '../Entities/BranchEntity';
import { OrderEntity } from '../Entities/OrderEntity';
import { UbicationEntity } from '../Entities/UbicationEntity';

export class BranchModel {
    static async findById(id: number): Promise<BranchEntity | null> {
        const branch = await BranchEntity.query().findById(id).withGraphFetched('[orders, ubication]');
        return branch || null;
    }    

    static async findAll(): Promise<BranchEntity[]> {
        return await BranchEntity.query().withGraphFetched('[orders, ubication]');
    }

    static async create(branchData: Partial<BranchEntity>): Promise<BranchEntity> {
        return await BranchEntity.query().insert(branchData);
    }

    static async updateById(id: number, updateData: Partial<BranchEntity>): Promise<BranchEntity | null> {
        return await BranchEntity.query().patchAndFetchById(id, updateData);
    }

    static async deleteById(id: number): Promise<number> {
        return await BranchEntity.query().deleteById(id);
    }

    static async getOrdersByBranchId(branchId: number): Promise<OrderEntity[]> {
        const branch = await BranchEntity.query().findById(branchId).withGraphFetched('orders');
        return branch?.orders || [];
    }

    static async getUbicationByBranchId(branchId: number): Promise<UbicationEntity | null> {
        const branch = await BranchEntity.query().findById(branchId).withGraphFetched('ubication');
        return branch?.ubication || null;
    }
}
