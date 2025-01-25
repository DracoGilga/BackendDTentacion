import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('ingredients', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('quantity').notNullable();
        table.decimal('unitPrice', 10, 2).notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('ingredients');
}