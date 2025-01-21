import * as dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

interface IDBConfig extends Knex.Config { }

interface IConfig {
	development: IDBConfig;
	test: IDBConfig;
	production: IDBConfig;
}

export const Config: IConfig = {
	development: {
		client: 'mssql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			port: Number(process.env.DB_PORT) || 1433,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			directory: './migrations',
			tableName: 'knex_migrations',
		},
	},
	test: {
		client: 'mssql',
		connection: {
			host: process.env.TEST_DB_HOST,
			user: process.env.TEST_DB_USER,
			password: process.env.TEST_DB_PASSWORD,
			database: process.env.TEST_DB_DATABASE,
			port: Number(process.env.TEST_DB_PORT) || 1433,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			directory: './migrations',
			tableName: 'knex_migrations',
		},
	},
	production: {
		client: 'mssql',
		connection: {
			host: process.env.PROD_DB_HOSTNAME,
			user: process.env.PROD_DB_USER,
			password: process.env.PROD_DB_PASSWORD,
			database: process.env.PROD_DB_DATABASE,
			port: Number(process.env.PROD_DB_PORT) || 1433,
		},
		pool: { min: 2, max: 10 },
		migrations: {
			directory: './migrations',
			tableName: 'knex_migrations',
		},
	},
};
