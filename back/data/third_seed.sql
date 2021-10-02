BEGIN;
-- Insert une série de carte dans le deck 1
INSERT INTO "card" ("recto", "verso", deck_id) VALUES 
('La chanson préférée de Tony', 'La Merguez Party', 1),
('Le gras ...', '... c''est la vie', 1),
('Quelle est la boucle `for` préférée de Quentin ?', '`for of` (il déteste `for each`)', 1),
('Qui a dit "ça ne mange pas de pain"', 'Nicoclock de Nicocratie', 1),
('>"Cette fonction, elle est pas piquée des ..."?', '... vers ! (Nicoclock)', 1),
('C''est le nom du toutou de Nicoclock', 'Athena', 1),
(E'# Commande GIT\r\nCorriger le message de mon dernier commit', E'```\r\ngit commit --amend\r\n# suivre les instructions pour modifier le message de commit\r\n```', 1),
('JWT', 'Json Web Token', 1),
('Dans quelle région du monde des internets se trouve la *Nicocratie*', 'Dans le cockpit Data de Nicoclock (gloire à toi)', 1),
('A sacrifié sa belle chevelure en cours de socle de la promo Uther', 'Aleks', 1),
('A subi une allergie en plein cockpit', 'Baptiste', 1),
('Les reines et les rois du troll', 'La promo Uther', 1);
COMMIT;