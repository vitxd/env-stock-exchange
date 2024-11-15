import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('deployments', (table) => {
    table
      .integer('environment_id')
      .unsigned()
      .references('id')
      .inTable('environments');
    table.integer('service_id').unsigned().references('id').inTable('services');
    table.string('deployer');
    table.string('version');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.primary(['environment_id', 'service_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('deployments');
}
