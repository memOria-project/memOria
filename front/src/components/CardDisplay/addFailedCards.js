
const addFailedCards = (card, setFailedCards) => {
  setFailedCards((state) => [...state, card])
}

export default addFailedCards
