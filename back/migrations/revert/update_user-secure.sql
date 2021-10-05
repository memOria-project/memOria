-- Revert memoria:update_user-secure from pg

BEGIN;

-- DROP FUNCTION update_user1(incoming_user json);
DROP FUNCTION update_user2(incoming_user json);

COMMIT;
