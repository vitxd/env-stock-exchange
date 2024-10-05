import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').insert([
    { name: 'riskhub' },
    { name: 'actions' },
    { name: 'building_safety_case' },
    { name: 'document_vault' },
    { name: 'admin' },
    { name: 'surveyor' },
    { name: 'client' },
    { name: 'document_generator' },
    { name: 'monorepo' },
  ]);
}
