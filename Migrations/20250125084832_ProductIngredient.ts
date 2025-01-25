import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products_ingredients', (table) => {
        table.increments('id').primary();
        table.integer('productId').unsigned().notNullable();
        table.integer('ingredientId').unsigned().notNullable();
        table.foreign('productId').references('id').inTable('products').onDelete('CASCADE');
        table.foreign('ingredientId').references('id').inTable('ingredients').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('products_ingredients');
}