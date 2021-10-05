-- Deploy memoria:update_user-secure to pg

BEGIN;

CREATE FUNCTION update_user2(incoming_user json) RETURNS void AS $$
UPDATE "user" SET 
name= COALESCE((incoming_user->>'name')::TEXT, name),
email= COALESCE((incoming_user->>'email')::TEXT, email),
password= COALESCE((incoming_user->>'password')::TEXT, password)
WHERE id= (incoming_user->>'id')::int;
$$LANGUAGE SQL STRICT;

COMMIT;
