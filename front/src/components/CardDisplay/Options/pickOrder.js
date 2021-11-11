export const pickOrder = (database, order) => {
  const randomDatabase = database.slice()

  switch (order) {
    case 'RANDOM': {
      for (let i = randomDatabase.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomDatabase[i], randomDatabase[j]] = [randomDatabase[j], randomDatabase[i]]
      }
      console.log({ randomDatabase })
      return randomDatabase
    }
    default: {
      return database
    }
  }
}
