const setIndexNextCard = (setCurrentCard, currentCardIndex, databaseLength) => {
  if (currentCardIndex < databaseLength) {
    setCurrentCard(prevState => ({ ...prevState, index: currentCardIndex + 1 }))
  }
}

export default setIndexNextCard
