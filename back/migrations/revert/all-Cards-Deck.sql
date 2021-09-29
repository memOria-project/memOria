-- Revert memoria:all-Cards-Deck from pg

BEGIN;

DROP FUNCTION AllcardsFromDeck(deckId int);

COMMIT;
