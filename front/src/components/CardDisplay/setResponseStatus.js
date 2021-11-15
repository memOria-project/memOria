const setResponseStatus = (setDatabase, id, isCorrect) => {
  setDatabase(prevState => prevState.map((card) => {
    if (card.id == id && isCorrect) {
      console.log('correct!')
      return { ...card, response: 'correct' }
    } else if (card.id === id && !isCorrect) {
      console.log('wrong')

      return { ...card, response: 'wrong' }
    } else {
      return card
    }
  }))
}
export default setResponseStatus
