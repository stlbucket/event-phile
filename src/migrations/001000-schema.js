exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP SCHEMA IF EXISTS event_phile CASCADE;
`

const upScript = `
--||--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--||--
DROP SCHEMA IF EXISTS event_phile CASCADE;
--||--
CREATE SCHEMA event_phile;
--||--
GRANT usage ON SCHEMA event_phile TO public;
--||--
-- ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;
`
