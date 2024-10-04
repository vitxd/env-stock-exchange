import knex from 'Knex';

import knexConfig from '../../knexfile';

const iKnex = knex(knexConfig)

export default iKnex;