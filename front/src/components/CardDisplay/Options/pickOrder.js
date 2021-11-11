export const pickOrder = (database, order) => {
  const randomDatabase = Array.from(database) // crée une shallow copy, pour respecter l'immutabilité

  switch (order) {
    case 'RANDOM': {
      for (let i = randomDatabase.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomDatabase[i], randomDatabase[j]] = [randomDatabase[j], randomDatabase[i]]
      }
      console.log({ randomDatabase })
      return randomDatabase
    }
    // ordre chronologique
    default: {
      return database
    }
  }
}
