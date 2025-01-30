import { config } from "dotenv";
import { Knex } from "knex";

config();

interface IDBConfig extends Knex.Config {}

interface IRedisConfig {
    host: string;
    port: number;
    password?: string;
}

interface IJwtConfig {
    secret: string;
    expirationTime: number;
}

interface IEncryptionConfig {
    aesSecretKey: string;
    saltRounds: number;
}

interface IConfig {
    development: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
        encryption: IEncryptionConfig;
    };
    test: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
        encryption: IEncryptionConfig;
    };
    production: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
        encryption: IEncryptionConfig;
    };
    [key: string]: {
        database: IDBConfig;
        redis: IRedisConfig;
        redisExpirationTime: number;
        jwt: IJwtConfig;
        encryption: IEncryptionConfig;
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
        redisExpirationTime: Number(process.env.REDIS_EXPIRATION_TIME_MINUTES) || 10,
        jwt: {
            secret: process.env.JWT_SECRET || "secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
        encryption: {
            aesSecretKey: process.env.AES_SECRET_KEY || 'secret',
            saltRounds: Number(process.env.SALT_ROUNDS) || 10,
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
            host: process.env.TEST_REDIS_HOST || "127.0.0.1",
            port: Number(process.env.TEST_REDIS_PORT) || 6379,  
            password: process.env.TEST_REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.TEST_REDIS_EXPIRATION_TIME_MINUTES) || 10,
        jwt: {
            secret: process.env.JWT_SECRET || "secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
        encryption: {
            aesSecretKey: process.env.AES_SECRET_KEY || 'secret',
            saltRounds: Number(process.env.SALT_ROUNDS) || 10,
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
            host: process.env.PROD_REDIS_HOST || "127.0.0.1",
            port: Number(process.env.PROD_REDIS_PORT) || 6380,  
            password: process.env.PROD_REDIS_PASSWORD || undefined,
        },
        redisExpirationTime: Number(process.env.PROD_REDIS_EXPIRATION_TIME_MINUTES) || 10,
        jwt: {
            secret: process.env.JWT_SECRET || "secret",
            expirationTime: Number(process.env.JWT_EXPIRATION_TIME) || 3600, 
        },
        encryption: {
            aesSecretKey: process.env.AES_SECRET_KEY || 'secret',
            saltRounds: Number(process.env.SALT_ROUNDS) || 10,
        },
    },
};