import { Model } from 'objection';
import { OrderModel } from './OrderModel';
import { UbicationModel } from './UbicationModel';

export class BranchModel extends Model {
    static tableName = 'branches';

    id!: number;
    branchName!: string;
    ubicationId!: number;

    orders?: OrderModel[];
    ubication?: UbicationModel;

    static async findById(id: number): Promise<BranchModel | null> {
        return await this.query().findById(id).withGraphFetched('[orders, ubication]') || null;
    }

    static async findAll(): Promise<BranchModel[]> {
        return await this.query().withGraphFetched('[orders, ubication]');
    }

    static async create(branchData: Partial<BranchModel>): Promise<BranchModel> {
        return await this.query().insert(branchData);
    }

    static async updateById(id: number, updateData: Partial<BranchModel>): Promise<BranchModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }

    static async getOrdersByBranchId(branchId: number): Promise<OrderModel[]> {
        const branch = await this.query().findById(branchId).withGraphFetched('orders');
        return branch?.orders || [];
    }

    static async getUbicationByBranchId(branchId: number): Promise<UbicationModel | null> {
        const branch = await this.query().findById(branchId).withGraphFetched('ubication');
        return branch?.ubication || null;
    }

    static relationMappings = {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: () => OrderModel,
            join: {
                from: 'branches.id',
                to: 'orders.branchId',
            },
        },
        ubication: {
            relation: Model.BelongsToOneRelation,
            modelClass: () => UbicationModel,
            join: {
                from: 'branches.ubicationId',
                to: 'ubications.id',
            },
        },
    };
}