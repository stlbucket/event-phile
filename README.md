# event-phile
a postgraphile plugin to capture designated function calls as re-playable events 

*** this is draft status, at best

```$xslt
git clone https://github.com/stlbucket/event-phile.git
```

```$xslt
npm install
```

you might need to:

```$xslt
npm install -g knex-migrate
```

edit knexfile.js to update your connection string to a test database

```$xslt
knex-migrate up --env dev
```

```$xslt
./dev/execute.sh events
```

[a function recorded as an event](https://github.com/stlbucket/event-phile/blob/master/src/migrations/005100-fn-add-to-category.js)


```$xslt
-- this function would really be in another schema
------------------
create or replace function event_phile.add_to_category(
  _name text,
  _amount NUMERIC(50,2)
) returns event_phile.category as $$
declare
  _event_log event_phile.event_log;  -- this really wouldn't be here.  it just makes the function work for this illustration
  _category event_phile.category;
begin


------------------- PRE-PROCESSING
-- this would happen via the plugin
-- doing this here for illustration
-- this is the sql that happens before the function is called

INSERT INTO event_phile.event_log(
  occurred_at,
  event_name,
  event_key,
  status,
  args_json
)
SELECT
  current_timestamp,                                                       -- if occurred_at is not with event, then current_timestamp
  'event_phile.add_to_category',                                           -- populated by plugin
  _name,                                                                   -- this would actually be populated dynamically in the plugin
  'Captured',                                                              -- so far this is just captured
  ('{"_name": "' || _name || '" ,"_amount": ' || _amount ||'}')::jsonb     -- but really the args jsonified
RETURNING *
INTO _event_log;
------------------- END PRE-PROCESSING

------------------- PROCESSING
  -- this would be the bulk of the actual contents of the event_phile.add_to_category function
  -- if the event_phile.event_log_config.processing_mode for this event is = 'Consume'
  -- then this function would actually be executed

  INSERT INTO
  event_phile.category(
    name,
    total_amount
  )
  SELECT
    _name,
    _amount
  ON CONFLICT (name)
  DO UPDATE
  SET total_amount = category.total_amount + _amount
  RETURNING *
  INTO _category
  ;
------------------- END PROCESSING


------------------- POST-PROCESSING
-- this would happen via the plugin
-- update the event_log record
UPDATE event_phile.event_log
SET
  status = 'Consumed',
  result_json = '{}' -- result would by default be empty.  only if there were an error or auditing were enabled would result be recorded
WHERE id = _event_log.id;
------------------- END POST-PROCESSING

------------------- RETURN RESULTS
  -- this would be part of the actual function contents
  return _category;
------------------- END RETURN RESULTS

  ---------------------EXCEPTION HANDLING
    -- this would happen via the plugin
    -- the stacked diagnostics would be recorded in result_json
    -- and the status would be 'Errored'
end;
$$ language plpgsql strict security definer;
--||--
GRANT execute ON FUNCTION event_phile.add_to_category(
  text,
  numeric
) TO public;

```
