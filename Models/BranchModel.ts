import { Model } from 'objection';
import { UbicationModel } from './UbicationModel';

export class BranchModel extends Model {
    static tableName = 'branches';

    id!: number;
    branchName!: string;
    ubicationId!: number;

    ubication?: UbicationModel;

    static relationMappings = {
        ubication: {
            relation: Model.BelongsToOneRelation,
            modelClass: UbicationModel,
            join: {
                from: 'branches.ubicationId',
                to: 'ubications.id',
            },
        },
    };

    static async findById(id: number): Promise<BranchModel | null> {
        return await this.query().findById(id).withGraphJoined('[ubication]') || null;
    }

    static async findAll(): Promise<BranchModel[]> {
        return await this.query().withGraphJoined('[ubication]');
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

    static async getUbicationByBranchId(branchId: number): Promise<UbicationModel | null> {
        const branch = await this.query().findById(branchId).withGraphJoined('ubication');
        return branch?.ubication || null;
    }
}