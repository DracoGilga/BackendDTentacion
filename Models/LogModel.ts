import { LogEntity } from '../Entities/LogEntity';

export class LogModel {
    static async create(logData: Partial<LogEntity>): Promise<LogEntity> {
        return await LogEntity.query().insert(logData);
    }

    static async findAll(): Promise<LogEntity[]> {
        return await LogEntity.query();
    }

    static async findByUsername(username: string): Promise<LogEntity[]> {
        return await LogEntity.query().where('username', username);
    }

    static async findByDateRange(startDate: Date, endDate: Date): Promise<LogEntity[]> {
        return await LogEntity.query()
            .where('dateTime', '>=', startDate)
            .andWhere('dateTime', '<=', endDate);
    }
}
