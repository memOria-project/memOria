-- Revert memoria:func-cardsOfUser from pg

BEGIN;

DROP FUNCTION cards_of_user(INT);

COMMIT;
