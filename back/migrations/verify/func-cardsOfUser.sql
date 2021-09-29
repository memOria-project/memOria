-- Verify memoria:func-cardsOfUser on pg

BEGIN;

SELECT * FROM cards_of_user(1) WHERE false;

ROLLBACK;
