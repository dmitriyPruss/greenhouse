-- Create views
CREATE VIEW index_ids AS SELECT id as "indexId" FROM indexes;

CREATE VIEW generated_values AS SELECT (floor(random() * 100 * 100 + 1))/100 as value
FROM generate_series(1, 10100);

CREATE VIEW values_data AS SELECT "indexId", value FROM index_ids, generated_values; 

-- Delete views
DROP VIEW index_ids;
DROP VIEW generated_values;
DROP VIEW values_data;

-- insert millions strings to sql-table values
INSERT INTO values (id, "indexId", value, "createdAt") SELECT gen_random_uuid () as id, "indexId", value, now() - random() * (timestamp '2022-10-08 07:00:00' - timestamp '2022-10-08 01:00:00') as "createdAt" FROM values_data
on conflict do nothing;

-- test
CREATE INDEX IF NOT EXISTS created_at_idx
ON values
USING btree ("createdAt" DESC);

ALTER TABLE values CLUSTER ON created_at_idx;

CLUSTER values USING created_at_idx;

DROP INDEX IF EXISTS created_at_idx;

CREATE INDEX IF NOT EXISTS index_id_idx
ON values
USING btree ("indexId");

DROP INDEX IF EXISTS index_id_idx;

EXPLAIN ANALYZE 
SELECT * FROM values
WHERE "indexId" = '58ec98dc-6093-4af9-980d-66feaa8ca02d' OR
"indexId" = 'e9b7aff2-129c-4894-9471-0f1c328e3d07' OR 
"indexId" = '40859b45-85e2-4f6d-95d0-8d4a06ee7c58';  
