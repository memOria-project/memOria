# Memoria - Backend local development setup

Ce sous-dépôt est destiné à l'API de memoria.

Ce projet est une API REST pour gérer les appels du front et l'alimenter (paquets publics, authentification, gestion du compte, gestion des paquets perso et des cartes qui les composent)

## Stack technique

- [NodeJS](https://nodejs.org/en/download) (v12 ou supérieur)
- [PostgreSQL](https://postgresql.org/download) (v12 ou supérieur)
- [Sqitch](https://sqitch.org/download) (v1 ou supérieur)

Ces outils sont nécessaires à l'installation et au fonctionnement de l'API.
A installer sur votre hôte avant de continuer.

## Installation

Cloner le dépot en local

```bash
git clone git@github.com:memOria-project/memOria.git ~/memoria
```

Puis dans le dossier back, installer les dépendances npm

```bash
cd ~/memoria/back
npm install
```

### Variables d'environnement
Copier le fichier .env.example, le renommer en .env et adapter les informations.

### Variable d'environnement

Copier le fichier `.sqitch.conf.example`

Le renommer en `sqitch.conf`

Modifier ou rajouter la ligne avec
```
target = db:pg://login:password@localhost:5432/memoria
```

### Base de données
Créer la base de données memoria dans PostgreSQL

```bash
createdb -U postgres memoria
```

Déployer le projet Sqitch
```bash
sqitch deploy
```

Vous serez peut être amener à configurer PostgreSQL (ou fournir les variables d'environnement nécéssaires) pour que les commandes `createdb` et `sqitch` puissent s'exécuter.

## Lancement

```bash
npm run dev (node-dev)
npm start (node)
```
