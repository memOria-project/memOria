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

-- Second curated collection: six complete learning paths.
INSERT OR IGNORE INTO decks (id, title, tag, user_id) VALUES
  (7, 'TypeScript — essentiels', '["typescript","javascript"]', 1),
  (8, 'HTTP & API REST', '["http","api"]', 1),
  (9, 'Tests automatisés — bonnes pratiques', '["tests","qualité"]', 1),
  (10, 'Node.js — construire une API', '["nodejs","backend"]', 1),
  (11, 'Sécurité web — réflexes essentiels', '["sécurité","web"]', 1),
  (12, 'Performance web — fondamentaux', '["performance","web"]', 1);

INSERT OR IGNORE INTO cards (id, recto, verso, deck_id) VALUES
  (37, 'Pourquoi utiliser TypeScript ?', 'Pour détecter des incohérences avant l’exécution, mieux documenter le code et améliorer l’autocomplétion.', 7),
  (38, 'Différence entre `type` et `interface` ?', 'Les deux décrivent des formes. Une `interface` est extensible par déclaration ; un `type` compose aussi unions, tuples et primitives.', 7),
  (39, 'Que signifie `name?: string` ?', 'La propriété `name` est optionnelle : sa valeur peut être une chaîne ou `undefined`.', 7),
  (40, 'Pourquoi préférer `unknown` à `any` ?', '`unknown` oblige à vérifier le type avant d’utiliser la valeur, tandis que `any` désactive ces contrôles.', 7),
  (41, 'Créer une union de littéraux', '```ts\ntype Status = "idle" | "loading" | "success" | "error";\n```', 7),
  (42, 'À quoi sert `keyof` ?', 'À produire une union contenant les noms de propriétés d’un type.', 7),
  (43, 'Que fait une fonction retournant `never` ?', 'Elle ne se termine jamais normalement : elle lève une erreur ou boucle indéfiniment.', 7),
  (44, 'Comment rendre un tableau non modifiable ?', 'Avec `readonly T[]` ou `ReadonlyArray<T>`.', 7),

  (45, 'Que signifie le statut HTTP `200` ?', 'La requête a réussi et la réponse contient la représentation demandée.', 8),
  (46, 'Quand renvoyer le statut `201 Created` ?', 'Après la création réussie d’une ressource ; l’en-tête `Location` peut indiquer son URL.', 8),
  (47, 'Différence entre `PUT` et `PATCH` ?', '`PUT` remplace conceptuellement la représentation complète ; `PATCH` applique une modification partielle.', 8),
  (48, 'Que signifie « méthode idempotente » ?', 'Répéter la même requête produit le même effet final qu’une seule exécution.', 8),
  (49, 'À quoi sert l’en-tête `Content-Type` ?', 'À indiquer le format du corps envoyé, par exemple `application/json`.', 8),
  (50, 'Que représente le statut `401` ?', 'L’authentification est absente ou invalide. `403` signifie que l’identité est connue mais non autorisée.', 8),
  (51, 'Pourquoi paginer une collection ?', 'Pour limiter le volume transféré, le coût serveur et le temps d’affichage.', 8),
  (52, 'Exemple de ressource REST cohérente', '```text\nGET /articles/42\nPOST /articles\nPATCH /articles/42\nDELETE /articles/42\n```', 8),

  (53, 'Que doit vérifier un test unitaire ?', 'Un comportement précis d’une petite unité, avec des dépendances aussi limitées que possible.', 9),
  (54, 'Structure Arrange–Act–Assert', '**Arrange** prépare, **Act** exécute, **Assert** vérifie le résultat observable.', 9),
  (55, 'Différence entre test unitaire et test d’intégration ?', 'Le test unitaire isole une petite unité ; le test d’intégration vérifie que plusieurs composants collaborent correctement.', 9),
  (56, 'Pourquoi éviter de tester les détails d’implémentation ?', 'Ils rendent les tests fragiles lors d’un refactoring qui ne change pourtant aucun comportement utilisateur.', 9),
  (57, 'Qu’est-ce qu’un cas limite ?', 'Une entrée située à une frontière : tableau vide, valeur maximale, chaîne absente ou date de transition.', 9),
  (58, 'À quoi sert un mock ?', 'À remplacer temporairement une dépendance afin de contrôler ses réponses ou d’observer ses interactions.', 9),
  (59, 'Qualité principale d’un bon nom de test', 'Il décrit le comportement attendu et le contexte : « refuse un e-mail déjà utilisé ».', 9),
  (60, 'Pourquoi exécuter les tests dans la CI ?', 'Pour vérifier automatiquement chaque changement dans un environnement reproductible avant son intégration.', 9),

  (61, 'Qu’est-ce que la boucle d’événements de Node.js ?', 'Le mécanisme qui orchestre les callbacks et opérations asynchrones sans bloquer le thread JavaScript principal.', 10),
  (62, 'Où conserver un secret d’application ?', 'Dans une variable d’environnement ou un gestionnaire de secrets, jamais dans le dépôt Git.', 10),
  (63, 'Pourquoi valider le corps d’une requête ?', 'Toute donnée reçue est non fiable : il faut contrôler type, format, longueur et valeurs autorisées.', 10),
  (64, 'Rôle d’un middleware HTTP', 'Exécuter une logique transversale avant ou après le gestionnaire : auth, logs, CORS ou gestion d’erreurs.', 10),
  (65, 'Pourquoi centraliser la gestion des erreurs ?', 'Pour produire des réponses cohérentes, journaliser utilement et éviter d’exposer des détails internes.', 10),
  (66, 'Qu’est-ce qu’une opération bloquante ?', 'Une tâche synchrone longue qui empêche la boucle d’événements de traiter les autres requêtes.', 10),
  (67, 'Pourquoi fermer proprement le serveur ?', 'Pour terminer les requêtes en cours et libérer connexions, fichiers et ressources lors d’un arrêt.', 10),
  (68, 'Séquence classique d’un endpoint', '`router` → validation → authentification → service métier → accès aux données → réponse.', 10),

  (69, 'Pourquoi hacher les mots de passe ?', 'Pour ne jamais stocker leur valeur d’origine. Utiliser un algorithme lent et salé comme Argon2, scrypt ou bcrypt.', 11),
  (70, 'Qu’est-ce qu’une injection SQL ?', 'L’interprétation de données utilisateur comme du SQL. Les requêtes paramétrées séparent code et valeurs.', 11),
  (71, 'Comment réduire le risque XSS ?', 'Échapper le contenu non fiable, éviter l’injection de HTML brut et appliquer une Content Security Policy.', 11),
  (72, 'À quoi sert l’attribut de cookie `HttpOnly` ?', 'À empêcher JavaScript d’accéder au cookie, ce qui limite le vol de session par XSS.', 11),
  (73, 'À quoi sert `SameSite` sur un cookie ?', 'À contrôler son envoi lors de navigations intersites et à réduire certains risques CSRF.', 11),
  (74, 'Pourquoi limiter le nombre de tentatives de connexion ?', 'Pour ralentir les attaques par force brute et protéger les comptes.', 11),
  (75, 'Principe du moindre privilège', 'Chaque utilisateur, service ou clé ne reçoit que les droits nécessaires à sa tâche.', 11),
  (76, 'Que faut-il mettre dans les logs de sécurité ?', 'Les événements utiles à l’enquête, sans mots de passe, jetons ni données personnelles superflues.', 11),

  (77, 'Que mesure le LCP ?', 'Le délai d’affichage du plus grand élément de contenu visible ; il reflète la vitesse de chargement perçue.', 12),
  (78, 'Que mesure le CLS ?', 'La somme des déplacements visuels inattendus pendant le chargement de la page.', 12),
  (79, 'Comment éviter le décalage causé par une image ?', 'Définir ses dimensions ou son `aspect-ratio` afin de réserver l’espace avant son chargement.', 12),
  (80, 'Pourquoi compresser les images ?', 'Elles représentent souvent la majorité des octets d’une page ; un format et une taille adaptés accélèrent fortement le rendu.', 12),
  (81, 'Qu’est-ce que le lazy loading ?', 'Le chargement différé d’une ressource non nécessaire immédiatement, par exemple une image hors écran.', 12),
  (82, 'Pourquoi découper le JavaScript ?', 'Pour ne charger au départ que le code indispensable à la route affichée.', 12),
  (83, 'Rôle du cache HTTP', 'Réutiliser une réponse encore valide pour éviter transfert, latence et calcul inutiles.', 12),
  (84, 'Première règle d’une optimisation fiable', 'Mesurer avant et après avec un scénario représentatif : réseau, appareil, cache et données réalistes.', 12);
