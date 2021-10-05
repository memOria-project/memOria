INSERT INTO deck (title, tag, user_id) VALUES (
	'O''clock JS Saison 1',
	'{"HTML", "CSS"}',
	12
);


INSERT INTO card (recto, verso, deck_id) VALUES 
	(E'50% de la largeur d''écran en CSS', E'```css\nwidth: 50vw;\n```', 17),
	(E'Mettre du texte en italique via le CSS', E'```css\nfont-style: italic;\n```', 17),
	(E'Titre d''une page HTML dans le head', E'```html\n<head>\n<title>Titre du document</title>\n</head>\n```', 17),
	(E'Site ressource HTML', E'[MDN](https://developer.mozilla.org/fr/)', 17),
	(E'Sites ressource CSS', E'[css-tricks.com](https://css-tricks.com/)', 17),
	(E'Site ressource CSS Flexbox', E'CSS-tricks Flexbox\n(https://css-tricks.com/snippets/css/a-guide-to-flexbox/)', 17),
	(E'Site pour tester des snippets de front-end', E'[CodePen](https://codepen.io/pen/)', 17),
	(E'Méthodes pour aligner horizontalement un élément du DOM', E'```css\ntext-align: center;\n```\nou\n```css\nmargin: auto;\n```\nou\n```css\ndisplay: flex;\nflex-flow: column nowrap;\nalign-items: center;\n```', 17),
	(E'Inclure l''épaisseur des bordures\ndans les hauteurs et largeurs assignées aux éléments HTML', E'```css\nbox-sizing: border-box;\n```', 17),
	(E'Syntaxe d''un formulaire HTML avec une méthode POST', E'```css\n<form action="submit" method="post" class="form-example">\n\s\s<div class="form-example">\n\s\s\s\s<label for="name">Enter your name: </label>\n\s\s\s\s<input type="text" name="name" id="name" required>\n\s\s</div>\n</form>\n```', 17)
;

INSERT INTO deck (title, tag, user_id) VALUES (
	'O''clock JS Saison 2 (Fonctions JS)',
	'{"Javascript"}',
	12
);

SELECT * FROM deck

INSERT INTO card (recto, verso, deck_id) VALUES
	(E'`alert(message)`', E'Affiche une pop-up\navec un message et un bouton `OK`', 18),
	(E'`prompt()`', E'affiche une pop-up / boîte de dialogue\npermettant à l’utilisateur de saisir\n - une valeur,\n - avec un bouton `OK`', 18),
	(E'confirm()', E'Affiche une boîte de dialogue\npermettant à l’utilisateur de choisir entre\n - `Annuler`\net\n - `OK`', 18),
	(E'### Quelle est la particularité de ces 3 fonctions?\n`alert()`\n`prompt()`\n`confirm()`', E'Ces 3 fonctions bloquent l’exécution du JS,\nla page est « _en pause_ ».', 18),
	(E'`console.log()`', E'## Affiche un message dans la console', 18),
	(E'`console.info()`', E'## Alias de `console.log()`\n### Affiche un message dans la console', 18),
	(E'`console.warn()`', E'## Affiche un message d''avertissement (jaune avec icône) dans la console', 18),
	(E'`console.error()`', E'## Affiche un message d''erreur (rouge avec icône d’erreur) dans la console', 18),
	(E'`Number(string)`', E'## Transforme une chaîne de caractère en nombre\nexemple :\n```javascript\nNumber(''42'') // => 42)\n```', 18),
	(E'`parseInt(string)`', E'## Transforme une chaîne de caractère en nombre\n(comme `Number()`), mais en plus, est capable de rechercher les chiffres en début de texte\npour les transformer en nombre\n(exemple :\n```javascript\nparseInt(''3 pommes'') //=> 3\n```', 18),
	(E'`String.lenght`', E'## Permet de récupérer la longueur d’une chaîne de caractères', 18),
	(E'`String.indexOf()`', E'## Permet de récupérer le premier index d’un élément dans une chaîne de caractères\n```javascript\n''fruits''.indexOf(''i''); // => 3 (index 3 de la chaîne)\n''fruits''.indexOf(''a''); // => -1 (''a'' n''est pas trouvé)\n```', 18),
	(E'`String.lastIndexOf()`', E'## Permet de récupérer l''index de la position de la dernière occurrence d’un élément dans une chaîne de caractères\n```javascript\n''banane''.lastIndexOf(''a''); // => 3 (index 3 de la chaîne, ie. 4ème lettre)\n''banane''.lastIndexOf(''f''); // => -1 (''f'' n''est pas trouvé, donc -1)\n```', 18),
	(E'`Array.length`', E'## Permet de récupérer le nombre d’éléments que possède un tableau', 18),
	(E'`Array.indexOf()`', E'## Permet de récupérer l’index de la position de la première occurence d’un élément dans un tableau', 18),
	(E'`Math.random()`', E'## Génère un nombre aléatoire entre 0 et 1', 18),
	(E'`Math.round()`', E'## Arrondi un nombre à l’entier le plus proche', 18),
	(E'`Math.floor()`', E'## Arrondi un nombre à l’entier inférieur', 18),
	(E'`Math.ceil()`', E'## Arrondi un nombre à l’entier supérieur', 18)
;