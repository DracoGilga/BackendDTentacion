import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

interface IDBConfig extends Knex.Config { }

interface IRedisConfig {
    host: string;
    port: number;
    password?: string;
}

interface IConfig {
    development: {
        database: IDBConfig;
        redis: IRedisConfig;
    };
    test: {
        database: IDBConfig;
        redis: IRedisConfig;
    };
    production: {
        database: IDBConfig;
        redis: IRedisConfig;
    };
}

export const Config: IConfig = {
    development: {
        database: {
            client: 'mssql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: Number(process.env.DB_PORT) || 1433,
            },
            pool: { min: 2, max: 10 },
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
    },
    test: {
        database: {
            client: 'mssql',
            connection: {
                host: process.env.TEST_DB_HOST,
                user: process.env.TEST_DB_USER,
                password: process.env.TEST_DB_PASSWORD,
                database: process.env.TEST_DB_DATABASE,
                port: Number(process.env.TEST_DB_PORT) || 1433,
            },
            pool: { min: 2, max: 10 },
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
    },
    production: {
        database: {
            client: 'mssql',
            connection: {
                host: process.env.PROD_DB_HOSTNAME,
                user: process.env.PROD_DB_USER,
                password: process.env.PROD_DB_PASSWORD,
                database: process.env.PROD_DB_DATABASE,
                port: Number(process.env.PROD_DB_PORT) || 1433,
            },
            pool: { min: 2, max: 10 },
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
    },
};
