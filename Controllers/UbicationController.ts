import { UbicationModel } from '../Models/UbicationModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class UbicationController {
    static async getUbicationById(id: number) {
        const cacheKey = `ubication:${id}`;
        return RedisHelper.getOrCreate<UbicationModel | null>(
            cacheKey,
            async () => UbicationModel.findById(id)
        );
    }

    static async getAllUbications() {
        const cacheKey = `ubications:all`;
        return RedisHelper.getOrCreate<UbicationModel[]>(
            cacheKey,
            async () => UbicationModel.findAll()
        );
    }

    static async createUbication(input: Partial<UbicationModel>) {
        const newUbication = await UbicationModel.create(input);
        await RedisHelper.delKeysByPattern(`ubications:*`);
        return newUbication;
    }

    static async updateUbication(id: number, input: Partial<UbicationModel>) {
        const updatedUbication = await UbicationModel.updateById(id, input);
        if (updatedUbication) {
            await RedisHelper.set(`ubication:${id}`, updatedUbication);
            await RedisHelper.delKeysByPattern(`ubications:*`);
        }
        return updatedUbication;
    }

    static async deleteUbication(id: number) {
        const deletedRows = await UbicationModel.deleteById(id);
        if (deletedRows > 0) {
            await RedisHelper.del(`ubication:${id}`);
            await RedisHelper.delKeysByPattern(`ubications:*`);
        }
        return deletedRows > 0;
    }
}