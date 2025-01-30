import Redis from "ioredis";
import { Config } from "./Config";

const environment = process.env.NODE_ENV || "development";
const redisConfig = Config[environment].redis;

const redisOptions: any = {
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
};

if (environment === "production") {
    redisOptions.tls = { rejectUnauthorized: false };
}

export const RedisDB = new Redis(redisOptions);