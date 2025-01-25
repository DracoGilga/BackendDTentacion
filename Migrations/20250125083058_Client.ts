import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('clients', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('lastName').notNullable();
        table.string('phone').notNullable().unique();
        table.date('birthDate').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('role').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('clients');
}