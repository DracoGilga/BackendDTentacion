import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('category_product', (table) => {
        table.increments('id').primary();
        table.string('categoryName').notNullable();
        table.text('categoryDescription').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('category_product');
}