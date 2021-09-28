-- Revert memoria:init-db-2 from pg

BEGIN;

DROP TABLE "delay";
DROP TABLE "card";
DROP TABLE "deck";
DROP TABLE "user";

COMMIT;
