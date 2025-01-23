import { UbicationModel } from '../../Models/UbicationModel';
import { RedisHelper } from '../../Utils/RedisHelper';

export const UbicationResolver = {
    Query: {
        getUbicationById: async (_: any, { id }: { id: number }) => {
            const cacheKey = `ubication:${id}`;
            const cachedUbication = await RedisHelper.get(cacheKey);

            if (cachedUbication)
                return cachedUbication;

            const ubication = await UbicationModel.findById(id);

            if (ubication) 
                await RedisHelper.set(cacheKey, ubication);

            return ubication;
        },

        getAllUbications: async () => {
            const cacheKey = `ubications:all`;
            const cachedUbications = await RedisHelper.get(cacheKey);

            if (cachedUbications)
                return cachedUbications;

            const ubications = await UbicationModel.findAll();

            if (ubications.length > 0) 
                await RedisHelper.set(cacheKey, ubications);

            return ubications;
        },
    },

    Mutation: {
        createUbication: async (_: any, { input }: { input: Partial<UbicationModel> }) => {
            const newUbication = await UbicationModel.create(input);

            await RedisHelper.delKeysByPattern(`ubications:*`);

            return newUbication;
        },

        updateUbication: async (_: any, { id, input }: { id: number; input: Partial<UbicationModel> }) => {
            const updatedUbication = await UbicationModel.updateById(id, input);

            if (updatedUbication) {
                await RedisHelper.set(`ubication:${id}`, updatedUbication);
                await RedisHelper.delKeysByPattern(`ubications:*`);
            }

            return updatedUbication;
        },

        deleteUbication: async (_: any, { id }: { id: number }) => {
            const deletedRows = await UbicationModel.deleteById(id);

            if (deletedRows > 0) {
                await RedisHelper.del(`ubication:${id}`);
                await RedisHelper.delKeysByPattern(`ubications:*`);
            }

            return deletedRows > 0;
        },
    },
};