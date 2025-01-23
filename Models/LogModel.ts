import { Model } from 'objection';

export class LogModel extends Model {
    static tableName = 'logs';

    id!: number;
    username!: string;
    action!: string;
    dateTime!: Date;
    ipAddress!: string;
    macAddress!: string;

    static async create(logData: Partial<LogModel>): Promise<LogModel> {
        return await this.query().insert(logData);
    }

    static async findAll(): Promise<LogModel[]> {
        return await this.query();
    }

    static async findByUsername(username: string): Promise<LogModel[]> {
        return await this.query().where('username', username);
    }

    static async findByDateRange(startDate: Date, endDate: Date): Promise<LogModel[]> {
        return await this.query()
            .where('dateTime', '>=', startDate)
            .andWhere('dateTime', '<=', endDate);
    }
}