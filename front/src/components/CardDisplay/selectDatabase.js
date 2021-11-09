const selectDatabase = (database, databaseSelector) => {
  switch (databaseSelector) {
    case 'FAILED_1ST_ROUND': {
      database = initialFailedCards
      console.log('la database suivante est séléctionnée(2. cartes ratées, rounds impairs):', database)
      break
    }
    case 'FAILED_2ND_ROUND': {
      database = alternateFailedCards
      console.log('la database suivante est séléctionnée(1. cartes ratées, rounds pairs):', database)
      break
    }
    case 'NOT_MASTERED': {
      database = delayedCards
      console.log('la database suivante est séléctionnée(3. cartes delayed):', database)
      break
    }
    default: {
      database = allCards
      console.log('la database suivante est séléctionnée(4. toutes les cartes, par défaut):', database)
    }
  }
  // if (isAlternateRequired) {

  // } else if (isFailed) {

  // } else if (isDelayedReviewOn) {

  // } else if (!isFailed) {

  // }
}
