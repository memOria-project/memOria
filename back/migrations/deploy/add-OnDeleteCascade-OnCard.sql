-- Deploy memoria:add-OnDeleteCascade-OnCard to pg

BEGIN;

alter table "card"
drop constraint "card_deck_id_fkey";

alter table "card"
add constraint "card_deck_id_fkey"
   foreign key ("deck_id")
   references "deck"(id)
   on delete cascade;

COMMIT;
