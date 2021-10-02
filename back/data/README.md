# README : Memoria data

This folder `/back/data` aims to deliver seeding script sql files that will provide ~~fake~~ data, i.e users, decks, cards.

## Local deployment for test and develop

### 1. Create psql database **memoria**

If exits delete memoria database with `
`createdb memoria` (needed user *postgres* or with OWNER ROLE)

### 2. Deploy migrations with sqitch

From `/back` execute `sqitch deploy db:pg:memoria`

### 3. Run seeding scripts

`psql -U {ownerUser or postgres} -d memoria -f relativePathToData/xth-seed.sql`

This order must be respected:

1. `back/data/first_seed.sql`
2. `back/data/second_seed.sql`
3. `back/data/third_seed.sql`