import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('branches', (table) => {
        table.increments('id').primary();
        table.string('branchName').notNullable();
        table.integer('ubicationId').unsigned().notNullable();
        table.foreign('ubicationId').references('id').inTable('ubications').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('branches');
}