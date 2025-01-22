import { RedisDB } from "../Config/RedisDB";

const REDIS_TIME: number = 3600;

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
    }
};
