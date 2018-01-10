
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TYPE IF EXISTS event_phile.event_status CASCADE;
`

const upScript = `
CREATE TYPE event_phile.event_status AS ENUM (
  'Captured',
  'Consumed',
  'Canceled',
  'Errored'
);
`
