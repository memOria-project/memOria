-- Deploy memoria:init-db-2 to pg

BEGIN;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL    
);

CREATE TABLE "deck" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "tag" TEXT[],
    "user_id" INT REFERENCES "user"(id) NOT NULL
);

CREATE TABLE "card" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "recto" TEXT NOT NULL,
    "verso" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "deck_id" INT REFERENCES "deck"(id) NOT NULL
);

CREATE TABLE "delay" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "to_date" TIMESTAMPTZ NOT NULL DEFAULT now() + '2 minutes'::interval,
    "user_id" INT REFERENCES "user"(id) NOT NULL,
    "card_id" INT REFERENCES "card"(id) NOT NULL
);

COMMIT;
