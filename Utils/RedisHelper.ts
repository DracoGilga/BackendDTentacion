import { RedisDB } from "../Config/RedisDB";
import { Config } from "../Config/Config";

const environment = process.env.NODE_ENV || "development";
const REDIS_TIME: number = Config[environment].redisExpirationTime * 60;

export const RedisHelper = {
    async get<T>(key: string): Promise<T | null> {
        const cachedData = await RedisDB.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    },

    async set<T>(key: string, data: T): Promise<void> {
        await RedisDB.set(key, JSON.stringify(data), "EX", REDIS_TIME);
    },

    async del(key: string): Promise<void> {
        await RedisDB.del(key);
    },

    async delKeysByPattern(pattern: string): Promise<void> {
        let cursor = "0";
        
        do {
            const [nextCursor, keys] = await RedisDB.scan(cursor, "MATCH", pattern, "COUNT", 100);
            cursor = nextCursor;

            if (keys.length > 0) 
                await RedisDB.del(...keys);
            
        } while (cursor !== "0");
    },

    async exists(key: string): Promise<boolean> {
        const exists = await RedisDB.exists(key);
        return exists === 1;
    },

    async getOrCreate<T>(
        key: string,
        dataFetcher: () => Promise<T>,
        cacheExpiration: number = REDIS_TIME
    ): Promise<T> {
        let cachedData = await this.get<T>(key);

        if (!cachedData) {
            cachedData = await dataFetcher();
            await this.set(key, cachedData);
        }

        return cachedData;
    }
};