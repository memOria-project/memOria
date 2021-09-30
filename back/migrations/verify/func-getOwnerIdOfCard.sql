-- Verify memoria:func-getOwnerIdOfCard on pg

BEGIN;

SELECT * FROM get_owner_id_of_card(20) WHERE false;

ROLLBACK;
