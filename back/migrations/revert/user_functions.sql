-- Revert memoria:user_functions from pg

BEGIN;

DROP FUNCTION new_user(incoming_user json)
DROP FUNCTION update_user(incoming_user json)
DROP FUNCTION del_user(user_id int)

COMMIT;
