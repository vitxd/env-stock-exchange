import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('services', (table) => {
        table.increments('id');
        table.string('name');
        table.timestamps();
    })
}


export async function down(knex: Knex): Promise<void> {
}

