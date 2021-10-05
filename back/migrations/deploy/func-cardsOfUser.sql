-- Deploy memoria:func-cardsOfUser to pg

BEGIN;

CREATE FUNCTION cards_of_user(userId INT) RETURNS TABLE (id INT, recto TEXT, verso TEXT, deckId int, deckTitle TEXT) AS $$
	SELECT card.id, recto, verso, deck_id as deckId, deck.title as deckTitle FROM card
	JOIN deck ON deck_id = deck.id
	WHERE deck_id IN (
		SELECT id FROM deck WHERE user_id = $1
	)
$$ LANGUAGE SQL STRICT;

COMMIT;
