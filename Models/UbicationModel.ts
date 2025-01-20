import { UbicationEntity } from "../Entities/UbicationEntity";

export class UbicationModel {
    static async findById(id: number): Promise<UbicationEntity | null> {
        const ubication = await UbicationEntity.query().findById(id);
        return ubication || null;
    }

    static async findAll(): Promise<UbicationEntity[]> {
        return await UbicationEntity.query();
    }

    static async create(ubicationData: Partial<UbicationEntity>): Promise<UbicationEntity> {
        return await UbicationEntity.query().insert(ubicationData);
    }

    static async updateById(id: number, updateData: Partial<UbicationEntity>): Promise<UbicationEntity | null> {
        return await UbicationEntity.query().patchAndFetchById(id, updateData);
    }

    static async deleteById(id: number): Promise<number> {
        return await UbicationEntity.query().deleteById(id);
    }
}