import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('ubications', (table) => {
        table.increments('id').primary();
        table.string('description').notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('ubications');
}