import Redis from "ioredis";
import { Config } from "./Config";

const environment = process.env.NODE_ENV || "development";
const redisConfig = Config[environment].redis;

export const RedisDB = new Redis({
	host: redisConfig.host,
	port: redisConfig.port,
	password: redisConfig.password,
});

RedisDB.on("connect", () => {
	console.log("Conectado a Redis");
});

RedisDB.on("error", (err) => {
	console.error("Error en Redis:", err);
});