import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders_products', (table) => {
        table.increments('id').primary();
        table.integer('orderId').unsigned().notNullable();
        table.integer('productId').unsigned().notNullable();
        table.foreign('orderId').references('id').inTable('orders').onDelete('CASCADE');
        table.foreign('productId').references('id').inTable('products').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('orders_products');
}