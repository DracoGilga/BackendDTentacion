import { LogController } from "../../Controllers/LogController";
import { LogModel } from "../../Models/LogModel";
import { CustomContext } from '../../Middlewares/TokenMiddleware';
import { authorizeRoles  } from '../../Utils/AuthUtils';

export const LogResolver = {
    Query: {
        getAllLogs: async (context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await LogController.getAllLogs();
        },
        getLogsByUsername: async (_: any, { username }: { username: string }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await LogController.getLogsByUsername(username);
        },
        getLogsByDateRange: async (_: any, { startDate, endDate }: { startDate: string; endDate: string }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await LogController.getLogsByDateRange(startDate, endDate);
        },
    },
    Mutation: {
        createLog: async (_: any, { input }: { input: Partial<LogModel> }, context: CustomContext) => {
            authorizeRoles(context, ['Admin']);
            return await LogController.createLog(input);
        },
    },
};