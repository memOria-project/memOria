
const removeFailedCard = (currentCard, failedCards, setFailedCards) => {
  const filteredArray = failedCards.filter((card) => card.recto !== currentCard.recto && card.verso !== currentCard.verso)
  console.log({ failedCards, currentCard })
  setFailedCards(filteredArray)
}

export default removeFailedCard
