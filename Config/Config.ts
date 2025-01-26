import { config } from 'dotenv';
import { Knex } from 'knex';

config();

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
        redisExpirationTime: number;
    };
    test: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
    };
    production: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
    };
    [key: string]: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
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
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
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
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
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
        },
        redis: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
    },
};