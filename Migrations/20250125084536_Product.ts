import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('productName').notNullable();
        table.integer('stock').notNullable();
        table.float('finalPrice').notNullable();
        table.date('expirationDate').notNullable();
        table.integer('categoryId').unsigned().notNullable();
        table.foreign('categoryId').references('id').inTable('category_product').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('products');
}