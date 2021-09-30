-- Revert memoria:func-getOwnerIdOfCard from pg

BEGIN;

DROP FUNCTION get_owner_id_of_card(INT);

COMMIT;
