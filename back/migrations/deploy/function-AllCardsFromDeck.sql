-- Deploy memoria:function-AllCardsFromDeck to pg

BEGIN;

CREATE FUNCTION AllcardsFromDeck (deckId int) RETURNS TABLE (id int, recto text, verso text, deck_id int) AS $$

SELECT card.id, card.recto as recto, card.verso as verso, card.deck_id FROM deck
JOIN card ON deck.id = card.deck_id
WHERE deck.id = deckId;
														 
$$LANGUAGE SQL STRICT;

COMMIT;
