import { LogModel } from '../Models/LogModel';

export class LogController {
    static async getAllLogs() {
        return await LogModel.findAll();
    }

    static async getLogsByUsername(username: string) {
        return await LogModel.findByUsername(username);
    }

    static async getLogsByDateRange(startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await LogModel.findByDateRange(start, end);
    }

    static async createLog(input: Partial<LogModel>) {
        return await LogModel.create(input);
    }
}
