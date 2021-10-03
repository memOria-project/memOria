-- Revert memoria:func-cards-save from pg

BEGIN;

DROP FUNCTION create_card(json);
DROP FUNCTION update_card(json);
DROP FUNCTION is_card_owner(INT, INT);
DROP FUNCTION is_deck_owner(INT, INT);

COMMIT;
