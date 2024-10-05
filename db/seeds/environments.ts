import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('environments').upsert([
    { name: 'dev01' },
    { name: 'dev02' },
    { name: 'dev04' },
    { name: 'dev05' },
    { name: 'beta' },
  ]);
}
