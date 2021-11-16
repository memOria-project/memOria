const setIndexNextCard = (setCurrentCard, currentCardIndex) => {
  setCurrentCard(prevState => ({ ...prevState, index: currentCardIndex + 1 }))
}

export default setIndexNextCard
