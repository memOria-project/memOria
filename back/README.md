# Memoria - API

## API server local installation

These instructions will guide you to setup a local server for testing the API on your localhost.

### Prerequities stack:

- [git](https://git-scm.com/) (v2 last stable)
- [nodeJS](https://nodejs.dev/learn/introduction-to-nodejs) and npm (v17.x)
- [postgresql](https://www.postgresql.org/) (12.x + stable)
- [sqitch](https://sqitch.org/)

### Clone Github repo of memOria

```shell
git clone git@github.com:memOria-project/memOria.git ~/memoria
```

### Install dependencies

In _back_ subfolder, install dependencies (production and development)

```shell
cd ~/memoria/back & npm install
```

### Create database

Create a database named *memoria*
with command line

```bash
createdb memoria
```

or with `psql` with **postgres** role

```sql
CREATE DATABASE memoria;
```

### Launch API server

```shell
cd ~/memoria/back & npm run dev
```