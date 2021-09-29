-- Verify memoria:all-Cards-Deck on pg

BEGIN;

SELECT AllcardsFromDeck(1);

ROLLBACK;
