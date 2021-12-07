
const removeFailedCard = (currentCard, failedCards, setFailedCards) => {
  const filteredArray = failedCards.filter((card) => !card.recto === currentCard.recto && !card.verso === currentCard.verso)
  setFailedCards(filteredArray)
}

export default removeFailedCard
