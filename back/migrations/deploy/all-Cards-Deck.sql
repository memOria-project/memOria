-- Deploy memoria:all-Cards-Deck to pg

BEGIN;

CREATE FUNCTION AllcardsFromDeck(deckId int) RETURNS TABLE (id int, title text, tags text[], cards json) AS $$

SELECT deck.id, deck.title, deck.tag as tags, json_agg(card.*) AS cards
FROM deck
JOIN card ON deck.id = card.deck_id
WHERE deck.id = deckId
GROUP BY deck.id;

$$LANGUAGE SQL STRICT;

COMMIT;
