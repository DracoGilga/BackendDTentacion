import Knex from 'knex';

const config: Knex.Config = {
    client: 'mssql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'your_user',
        password: process.env.DB_PASSWORD || 'your_password',
        database: process.env.DB_DATABASE || 'your_database',
        port: Number(process.env.DB_PORT) || 1433,
    },
    migrations: {
        directory: './Migrations',
        tableName: 'knex_migrations',
    },
    seeds: {
        directory: './seeds',
    },
    pool: {
        min: 2,
        max: 10,
    },
};

export default config;
