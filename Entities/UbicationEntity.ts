import { Model } from 'objection';

export class UbicationEntity extends Model {
    static tableName = 'ubications';

    id!: number;
    description!: string;
    latitude!: number;
    longitude!: number;
}