-- Revert memoria:function-AllCardsFromDeck from pg

BEGIN;

DROP FUNCTION AllcardsFromDeck(id int);

COMMIT;
