import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('logs', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('action').notNullable();
        table.timestamp('dateTime').defaultTo(knex.fn.now()).notNullable();
        table.string('ipAddress').notNullable();
        table.string('macAddress').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('logs');
}