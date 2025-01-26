import * as dotenv from 'dotenv';
import type { Knex } from "knex";

dotenv.config();

const config: Knex.Config = {
    client: 'mssql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'database',
        port: Number(process.env.DB_PORT) || 1433,
    },
    migrations: {
        directory: './Migrations',
        tableName: 'knex_migrations',
    }
};

export default config;