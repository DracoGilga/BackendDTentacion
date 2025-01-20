import { UbicationModel } from '../Models/UbicationModel';

export const UbicationResolver = {
    Query: {
        getUbicationById: async (_: any, { id }: { id: number }) => {
            return await UbicationModel.findById(id);
        },
        getAllUbications: async () => {
            return await UbicationModel.findAll();
        },
    },
    Mutation: {
        createUbication: async (_: any, { input }: { input: Partial<UbicationModel> }) => {
            return await UbicationModel.create(input);
        },
        updateUbication: async (_: any, { id, input }: { id: number; input: Partial<UbicationModel> }) => {
            return await UbicationModel.updateById(id, input);
        },
        deleteUbication: async (_: any, { id }: { id: number }) => {
            const deletedRows = await UbicationModel.deleteById(id);
            return deletedRows > 0;
        },
    },
};