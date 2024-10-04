import knex from 'knex';
import bookshelf from 'bookshelf';

const iKnex = knex({
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test',
      charset  : 'utf8'
    }
  })

const orm = bookshelf(iKnex as any)
  
export default orm;