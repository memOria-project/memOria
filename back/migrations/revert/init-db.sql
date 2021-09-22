-- Revert memoria:init-db from pg

BEGIN;

DROP TABLE "delay";
DROP TABLE "card";
DROP TABLE "deck";
DROP TABLE "user";

COMMIT;
