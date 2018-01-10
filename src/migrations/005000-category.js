
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS event_phile.category CASCADE;
`

const upScript = `
CREATE TABLE event_phile.category (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  name text UNIQUE,
  total_amount numeric(50,2),
  CONSTRAINT pk_category PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE event_phile.category TO public;
`
