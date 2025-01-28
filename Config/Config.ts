import { config } from "dotenv";
import { Knex } from "knex";

config();

interface IDBConfig extends Knex.Config { }

interface IRedisConfig {
    host: string;
    port: number;
    password?: string;
}

interface IJwtConfig {
    secret: string;
    expirationTime: number;
}

interface IConfig {
    development: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
    };
    test: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
    };
    production: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
    };
    [key: string]: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
    };
}

export const Config: IConfig = {
    development: {
        database: {
            client: "mssql",
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                port: Number(process.env.DB_PORT) || 1433,
            },
        },
        redis: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
        jwt: {
            secret: process.env.JWT_SECRET || "default_secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
    },
    test: {
        database: {
            client: "mssql",
            connection: {
                host: process.env.TEST_DB_HOST,
                user: process.env.TEST_DB_USER,
                password: process.env.TEST_DB_PASSWORD,
                database: process.env.TEST_DB_DATABASE,
                port: Number(process.env.TEST_DB_PORT) || 1433,
            },
        },
        redis: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
        jwt: {
            secret: process.env.JWT_SECRET || "default_secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
    },
    production: {
        database: {
            client: "mssql",
            connection: {
                host: process.env.PROD_DB_HOSTNAME,
                user: process.env.PROD_DB_USER,
                password: process.env.PROD_DB_PASSWORD,
                database: process.env.PROD_DB_DATABASE,
                port: Number(process.env.PROD_DB_PORT) || 1433,
            },
        },
        redis: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 1,
        jwt: {
            secret: process.env.JWT_SECRET || "default_secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
    },
};