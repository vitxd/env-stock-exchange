import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('environment', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.timestamps();
    });
};

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('environment');

}
