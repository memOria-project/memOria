-- Verify memoria:func-cards-save on pg

BEGIN;

SELECT is_deck_owner(1,1) WHERE false;
SELECT is_card_owner(1,1) WHERE false;
-- SELECT update_card(json) WHERE false;
-- SELECT create_card(json) WHERE false;

ROLLBACK;
