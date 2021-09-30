-- Deploy memoria:user_functions to pg

BEGIN;

--- Création d'un nouvel user
CREATE FUNCTION new_user(incoming_user json) RETURNS int AS $$
	INSERT INTO "user" (name, email, password)
	VALUES (
	incoming_user->>'name',
	incoming_user->>'email',
	incoming_user->>'password'
	) RETURNING id;

$$LANGUAGE SQL STRICT;

--- Mise à jour d'un user
CREATE FUNCTION update_user(incoming_user json) RETURNS void AS $$
UPDATE "user" SET 
name= incoming_user->>'name',
email= incoming_user->>'email',
password= incoming_user->>'password'
WHERE id= (incoming_user->>'id')::int;
$$LANGUAGE SQL STRICT;

--- Suppression d'user
CREATE FUNCTION del_user(user_id int) RETURNS void AS $$
	DELETE FROM "user"
	WHERE id= user_id;

$$LANGUAGE SQL STRICT;



COMMIT;



