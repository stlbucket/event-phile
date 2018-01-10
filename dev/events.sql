
select event_phile.add_to_category(
  'TEST',
  4
);

select event_phile.add_to_category(
  'TEST',
  3
);

select event_phile.add_to_category(
  'TEST',
  -1
);

select
  event_name,
  event_key,
  status,
  args_json,
  result_json,
  occurred_at
from event_phile.event_log;

select *
from event_phile.category;