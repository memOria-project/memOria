-- Insert deux cartes contenant du Markdown dans le deck 3
BEGIN;
INSERT INTO "card" ("recto", "verso", deck_id) VALUES 
(E'```javascript\r\nconst hello = "hello"\r\n```', 'Comment déclarer une const en javascript', 3),
(E'```html\r\n<a href="mon lien">mon lien </a>\r\n```', 'Comment créer un lien en html?', 3);
COMMIT;