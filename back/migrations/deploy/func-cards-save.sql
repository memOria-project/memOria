-- Deploy memoria:func-cards-save to pg

BEGIN;

-- VERIFICATION OF DECK OWNER
CREATE FUNCTION is_deck_owner(deckId INT, userId INT) RETURNS BOOLEAN AS $$
	SELECT deck.user_id = userId
	FROM deck WHERE id = deckId
$$LANGUAGE SQL STRICT;

-- VERIFICATION OF CARD OWNER
CREATE FUNCTION is_card_owner(cardId INT, userId INT) RETURNS BOOLEAN AS $$
	SELECT is_deck_owner((
		SELECT deck_id FROM card
		WHERE card.id = cardId), userId)
$$LANGUAGE SQL STRICT;

-- UPDATE CARD IN ANY CASE
CREATE FUNCTION update_card(data json) RETURNS void AS $$
	UPDATE card SET
		recto=COALESCE((data->>'recto')::TEXT, recto),
		verso=COALESCE((data->>'verso')::TEXT, verso),
		deck_id=COALESCE((data->>'deckId')::INT, deck_id)
	WHERE id=(data->>'id')::INT
$$LANGUAGE SQL STRICT;

-- CREATE CARD IN ANY CASE
CREATE FUNCTION create_card(data json) RETURNS int AS $$
	INSERT INTO card (recto, verso, deck_id) VALUES (
		(data->>'recto')::TEXT,
		(data->>'verso')::TEXT,
		(data->>'deckId')::INT
	) RETURNING id;

$$LANGUAGE SQL STRICT;

COMMIT;
