import { LogController } from "../../Controllers/LogController";
import { LogModel } from "../../Models/LogModel";

export const LogResolver = {
    Query: {
        getAllLogs: async () => {
            return await LogController.getAllLogs();
        },
        getLogsByUsername: async (_: any, { username }: { username: string }) => {
            return await LogController.getLogsByUsername(username);
        },
        getLogsByDateRange: async (_: any, { startDate, endDate }: { startDate: string; endDate: string }) => {
            return await LogController.getLogsByDateRange(startDate, endDate);
        },
    },
    Mutation: {
        createLog: async (_: any, { input }: { input: Partial<LogModel> }) => {
            return await LogController.createLog(input);
        },
    },
};