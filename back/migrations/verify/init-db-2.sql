-- Verify memoria:init-db-2 on pg

BEGIN;

SELECT * FROM "deck" WHERE false;
SELECT * FROM "user" WHERE false;
SELECT * FROM "card" WHERE false;
SELECT * FROM "delay" WHERE false;

ROLLBACK;
