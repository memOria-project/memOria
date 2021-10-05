-- Deploy memoria:func-decksOfUser to pg

BEGIN;

CREATE OR REPLACE FUNCTION decks_of_user(userid INT) RETURNS TABLE (id INT, title TEXT, tags TEXT[], cards json) AS $$
	SELECT 
		deck.id as id, 
		title, 
		tag as tags, 
		json_agg(card.*) as cards
	FROM deck
	LEFT JOIN card ON deck_id = deck.id
	WHERE user_id = $1
	GROUP BY deck.id
$$LANGUAGE SQL STRICT;

COMMIT;
