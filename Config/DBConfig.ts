import Knex from 'knex';
import { Model } from 'objection';

const knexConfig = {
    client: 'mssql',
    connection: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'database',
        port: 1433,
    },
};

const knex = Knex(knexConfig);
Model.knex(knex);

export { knex };