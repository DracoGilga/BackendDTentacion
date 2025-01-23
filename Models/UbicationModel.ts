import { Model } from 'objection';

export class UbicationModel extends Model {
    static tableName = 'ubications';

    id!: number;
    description!: string;
    latitude!: number;
    longitude!: number;

    static async findById(id: number): Promise<UbicationModel | null> {
        return await this.query().findById(id) || null;
    }

    static async findAll(): Promise<UbicationModel[]> {
        return await this.query();
    }

    static async create(ubicationData: Partial<UbicationModel>): Promise<UbicationModel> {
        return await this.query().insert(ubicationData);
    }

    static async updateById(id: number, updateData: Partial<UbicationModel>): Promise<UbicationModel | null> {
        return await this.query().patchAndFetchById(id, updateData) || null;
    }

    static async deleteById(id: number): Promise<number> {
        return await this.query().deleteById(id);
    }
}