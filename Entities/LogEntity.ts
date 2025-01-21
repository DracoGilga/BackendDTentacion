import { Model } from 'objection';

export class LogEntity extends Model {
    static tableName = 'logs';

    id!: number;
    username!: string;
    action!: string;
    dateTime!: Date;
    ipAddress!: string;
    macAddress!: string;
}