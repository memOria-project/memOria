-- Revert memoria:func-decksOfUser from pg

BEGIN;

DROP FUNCTION decks_of_user(INT);

COMMIT;
