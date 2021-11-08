-- Verify memoria:deleteOnCascadeDelay on pg

BEGIN;

SELECT * FROM "delay" WHERE false;

ROLLBACK;
