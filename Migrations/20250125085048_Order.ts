import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.decimal('totalPrice', 14, 2).notNullable();
        table.integer('clientId').unsigned().notNullable();
        table.integer('branchId').unsigned().notNullable();
        table.foreign('clientId').references('id').inTable('clients').onDelete('CASCADE');
        table.foreign('branchId').references('id').inTable('branches').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('orders');
}