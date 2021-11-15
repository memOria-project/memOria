const setIndexPreviousCard = (setCurrentCard, currentCardIndex) => {
  if (currentCardIndex > 0) {
    setCurrentCard(prevState => ({ ...prevState, index: prevState.index - 1 }))
  }
}

export default setIndexPreviousCard
