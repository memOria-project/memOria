-- Deploy memoria:func-getOwnerIdOfCard to pg

BEGIN;

CREATE FUNCTION get_owner_id_of_card(INT) RETURNS INT AS $$
	SELECT user_id FROM DECK
	WHERE id = (
	    SELECT deck_id FROM card WHERE id = $1
	)
$$ LANGUAGE SQL STRICT;

COMMIT;
