import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('environments', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('owner').nullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('environments');
}
