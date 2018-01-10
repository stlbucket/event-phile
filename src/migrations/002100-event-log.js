
exports.up = function (knex, Promise) {
  return knex.raw(upScript)
}

exports.down = function (knex, Promise) {
  return knex.raw(downScript)
}

const downScript = `
DROP TABLE IF EXISTS event_phile.event_log CASCADE;
`

const upScript = `
CREATE TABLE event_phile.event_log (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v1(),
  captured_at timestamp NOT NULL DEFAULT current_timestamp,
  occurred_at timestamp NOT NULL,
  event_name text,
  event_key text,
  status event_phile.event_status NOT NULL,
  args_json jsonb NOT NULL,
  result_json jsonb NULL,
  CONSTRAINT pk_event_log PRIMARY KEY (id)
);
--||--
GRANT select ON TABLE event_phile.event_log TO public;
`
