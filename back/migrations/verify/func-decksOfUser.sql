-- Verify memoria:func-decksOfUser on pg

BEGIN;

SELECT * FROM decks_of_user(0) WHERE false;

ROLLBACK;
