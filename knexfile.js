module.exports = {
  dev: {
    client: 'postgresql',
    connection: 'postgres://evphile:evsecret@localhost/evphile',
    migrations: {
      directory: './src/migrations',
      tableName: 'public.knex_migrations'
    }
  }
}
