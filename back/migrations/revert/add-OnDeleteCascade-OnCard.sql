-- Revert memoria:add-OnDeleteCascade-OnCard from pg

BEGIN;

drop constraint "card_deck_id_fkey",

COMMIT;
