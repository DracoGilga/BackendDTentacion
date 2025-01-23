import { UbicationModel } from '../Models/UbicationModel';
import { RedisHelper } from '../Utils/RedisHelper';

export class UbicationController {
    static async getUbicationById(id: number) {
        const cacheKey = `ubication:${id}`;
        const cachedUbication = await RedisHelper.get(cacheKey);

        if (cachedUbication) return cachedUbication;

        const ubication = await UbicationModel.findById(id);

        if (ubication) await RedisHelper.set(cacheKey, ubication);

        return ubication;
    }

    static async getAllUbications() {
        const cacheKey = `ubications:all`;
        const cachedUbications = await RedisHelper.get(cacheKey);

        if (cachedUbications) return cachedUbications;

        const ubications = await UbicationModel.findAll();

        if (ubications.length > 0) await RedisHelper.set(cacheKey, ubications);

        return ubications;
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