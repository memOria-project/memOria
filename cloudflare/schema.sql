PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS decks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT '[]',
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS decks_user_id_idx ON decks(user_id);

CREATE TABLE IF NOT EXISTS cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recto TEXT NOT NULL,
  verso TEXT NOT NULL,
  deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS cards_deck_id_idx ON cards(deck_id);

CREATE TABLE IF NOT EXISTS delays (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  to_date TEXT NOT NULL,
  PRIMARY KEY (user_id, card_id)
);

INSERT OR IGNORE INTO users (id, name, email, password_hash)
VALUES (1, 'Memoria Demo', 'demo@memoria.local', 'disabled');

INSERT OR IGNORE INTO decks (id, title, tag, user_id) VALUES
  (1, 'HTML & CSS — les bases', '["html","css"]', 1),
  (2, 'JavaScript — essentiels', '["javascript"]', 1),
  (3, 'React — fondamentaux', '["react","javascript"]', 1);

INSERT OR IGNORE INTO cards (id, recto, verso, deck_id) VALUES
  (1, 'Quelle balise contient le contenu principal ?', '`<main>`', 1),
  (2, 'Comment centrer un bloc horizontalement ?', '```css\nmargin-inline: auto;\n```', 1),
  (3, 'Que retourne `Array.map()` ?', 'Un nouveau tableau transformé, sans modifier le tableau d’origine.', 2),
  (4, 'À quoi sert `const` ?', 'À déclarer une liaison qui ne peut pas être réassignée.', 2),
  (5, 'Quel hook stocke un état local ?', '`useState`', 3),
  (6, 'Pourquoi donner une `key` aux éléments d’une liste ?', 'Pour aider React à identifier les éléments entre deux rendus.', 3);

-- Additional curated revision material. Stable IDs keep the seed idempotent.
INSERT OR IGNORE INTO decks (id, title, tag, user_id) VALUES
  (4, 'Git — commandes utiles', '["git","outils"]', 1),
  (5, 'SQL — requêtes essentielles', '["sql","database"]', 1),
  (6, 'Accessibilité web — réflexes', '["accessibilité","html"]', 1);

INSERT OR IGNORE INTO cards (id, recto, verso, deck_id) VALUES
  (7, 'Quelle propriété inclut bordures et padding dans la largeur ?', '```css\nbox-sizing: border-box;\n```', 1),
  (8, 'Quelle balise regroupe les liens principaux de navigation ?', '`<nav>`', 1),
  (9, 'Comment espacer les enfants d’un conteneur flex ou grid ?', 'Avec la propriété `gap`.', 1),
  (10, 'Différence entre `rem` et `em` ?', '`rem` dépend de la taille racine ; `em` dépend de la taille du contexte courant.', 1),

  (11, 'Que fait `Array.filter()` ?', 'Il crée un nouveau tableau contenant seulement les éléments qui passent le test.', 2),
  (12, 'Différence entre `==` et `===` ?', '`===` compare sans conversion implicite de type.', 2),
  (13, 'À quoi sert l’opérateur `?.` ?', 'À parcourir une valeur potentiellement nulle sans déclencher d’erreur.', 2),
  (14, 'Que produit une fonction déclarée avec `async` ?', 'Elle retourne toujours une `Promise`.', 2),

  (15, 'Quel hook mémorise une valeur calculée ?', '`useMemo`.', 3),
  (16, 'Quand utiliser une fonction de nettoyage dans `useEffect` ?', 'Pour annuler un abonnement, un timer ou une ressource créée par l’effet.', 3),
  (17, 'Pourquoi ne faut-il pas modifier le state directement ?', 'React s’appuie sur de nouvelles références pour détecter et planifier les mises à jour.', 3),
  (18, 'À quoi sert une prop `key` stable ?', 'À préserver l’identité d’un élément dans une liste entre deux rendus.', 3),

  (19, 'Créer une nouvelle branche et s’y placer', '```bash\ngit switch -c ma-branche\n```', 4),
  (20, 'Voir l’état des fichiers suivis', '```bash\ngit status\n```', 4),
  (21, 'Ajouter uniquement un fichier à l’index', '```bash\ngit add chemin/du/fichier\n```', 4),
  (22, 'Modifier le message du dernier commit local', '```bash\ngit commit --amend\n```', 4),
  (23, 'Afficher un historique compact', '```bash\ngit log --oneline --graph --decorate\n```', 4),
  (24, 'Récupérer les commits distants sans fusionner', '```bash\ngit fetch\n```', 4),

  (25, 'Sélectionner toutes les colonnes de `users`', '```sql\nSELECT * FROM users;\n```', 5),
  (26, 'Filtrer les lignes selon une condition', 'Utiliser la clause `WHERE`.', 5),
  (27, 'Trier du plus récent au plus ancien', '```sql\nORDER BY created_at DESC\n```', 5),
  (28, 'Compter le nombre de lignes', '```sql\nSELECT COUNT(*) FROM table_name;\n```', 5),
  (29, 'À quoi sert un `INNER JOIN` ?', 'À conserver les lignes ayant une correspondance dans les deux tables.', 5),
  (30, 'Pourquoi utiliser une requête paramétrée ?', 'Pour séparer les données du SQL et limiter notamment les injections.', 5),

  (31, 'Que doit décrire l’attribut `alt` d’une image informative ?', 'L’information ou la fonction transmise par l’image, de façon concise.', 6),
  (32, 'Comment associer explicitement un label à un champ ?', 'Avec `<label for="email">` et un champ ayant `id="email"`.', 6),
  (33, 'Pourquoi conserver un focus clavier visible ?', 'Pour que la personne sache quel élément recevra la prochaine action.', 6),
  (34, 'Quel élément utiliser pour une action interactive ?', 'Un `<button>`, plutôt qu’une `div` cliquable.', 6),
  (35, 'À quoi sert `aria-label` ?', 'À fournir un nom accessible lorsqu’aucun libellé visible adapté n’existe.', 6),
  (36, 'Premier réflexe pour une page utilisable au clavier ?', 'Parcourir toute l’interface avec `Tab`, `Maj+Tab`, `Entrée` et `Espace`.', 6);
