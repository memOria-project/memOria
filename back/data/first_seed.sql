-- Add to database 'memoria' some items

BEGIN;

INSERT INTO "user" ("name", "email", "password") VALUES 
('toto', 'toto@s.fr', '123456'),
('tata', 'tata@s.fr', 'tata'),
('tutu', 'tutu@gmal.fr', 'azerty');

INSERT INTO deck (title, user_id, tag) VALUES 
('Un gros paquet', 1, '{"Javascript", "Saison 0"}'),
('Un très gros paquet', 3, '{"Express", "Saison 5"}'),
('Un beau paquet', 2, '{"React", "Saison 2"}'),
('Un tout petit paquet', 2, '{"PHP", "Saison 2"}')
;

INSERT INTO "card" ("recto", "verso", deck_id) VALUES 
('Pourquoi ?', 'Parce que...', 1),
('Mais pourquoi ?', 'Mais parce que...', 4),
('Pourquoi ?', 'Ta gueule !', 2);

INSERT INTO delay ("user_id", "card_id") VALUES
(1,1), 
(2,3), 
(1,1);

COMMIT;