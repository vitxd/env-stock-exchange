// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  testing: {
    client: 'mysql',
    connection: {
      database: 'envstockexchange',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'envstockexchange',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
