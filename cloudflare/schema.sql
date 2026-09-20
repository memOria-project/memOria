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

