# memoria

Une app pour partager des cartes de révisions librement et gratuitement, `avec du code` ou sans!

Create and share flash-cards, for free, `with code` or without  ;) 

https://memoria.german-fighter.workers.dev/

Adresse Netlify historique : https://memoria-oclock.netlify.app/

# Run with 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="drawing" width="50"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="drawing" width="50"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png" alt="drawing" width="50"/>


Feel free to fork / copy / use the code! 

## Backend actuel

L’interface utilise désormais un Worker Cloudflare minimal avec une base D1 persistante. Le
code, le schéma et les données de démonstration se trouvent dans `cloudflare/`.

```bash
npm run api:migrate:remote
npm run api:deploy
```

Pour utiliser une autre API pendant le développement du frontend, définir
`REACT_APP_API_ORIGIN=http://localhost:8787/v1`.
