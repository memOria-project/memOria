export const pickOrder = (database, order) => {
  const databaseCopy = Array.from(database) // crée une shallow copy, pour respecter l'immutabilité
  switch (order) {
    case 'RANDOM': {
      for (let i = databaseCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [databaseCopy[i], databaseCopy[j]] = [databaseCopy[j], databaseCopy[i]]
      }
      console.log({ databaseCopy })
      return databaseCopy
    }
    case 'REVERSE_CHRONO': {
      databaseCopy.sort(function (a, b) {
        return b.id - a.id
      })
      return databaseCopy
    }
    // ordre chronologique
    default: {
      databaseCopy.sort(function (a, b) {
        return a.id - b.id
      })
      return databaseCopy
    }
  }
}
