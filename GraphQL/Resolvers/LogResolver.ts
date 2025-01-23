import { LogModel } from '../../Models/LogModel';

export const LogResolver = {
    Query: {
        getAllLogs: async () => {
            return await LogModel.findAll();
        },
        getLogsByUsername: async (_: any, { username }: { username: string }) => {
            return await LogModel.findByUsername(username);
        },
        getLogsByDateRange: async (_: any, { startDate, endDate }: { startDate: string; endDate: string }) => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            return await LogModel.findByDateRange(start, end);
        },
    },
    Mutation: {
        createLog: async (_: any, { input }: { input: Partial<LogModel> }) => {
            return await LogModel.create(input);
        },
    },
};