import { Model } from 'objection';
import { OrderEntity } from './OrderEntity';
import { UbicationEntity } from './UbicationEntity';

export class BranchEntity extends Model {
    static tableName = 'branches';

    id!: number;
    branchName!: string;
    ubicationId!: number;

    orders?: OrderEntity[];
    ubication?: UbicationEntity;

    static relationMappings = {
        orders: {
            relation: Model.HasManyRelation,
            modelClass: () => OrderEntity,
            join: {
                from: 'branches.id',
                to: 'orders.branchId', 
            },
        },
        ubication: {
            relation: Model.BelongsToOneRelation,
            modelClass: () => UbicationEntity,
            join: {
                from: 'branches.ubicationId',
                to: 'ubications.id',
            },
        },
    };
}