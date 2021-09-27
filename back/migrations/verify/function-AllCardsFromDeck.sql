-- Verify memoria:function-AllCardsFromDeck on pg

BEGIN;

SELECT AllcardsFromDeck(1);

ROLLBACK;
