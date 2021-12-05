
import addFailedCards from './addFailedCards'

export const updateCount = (cardResponse, responseType, setCount, currentCard, setFailedCards) => {
  if (responseType === 'correct') {
    switch (cardResponse) {
      case 'notPicked': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1 }))
        break
      }
      case 'wrong': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
        break
      }
      case 'correct': {
        console.log('card response confirmed')
      }
    }
  } else {
    switch (cardResponse) {
      case 'notPicked': {
        addFailedCards(currentCard, setFailedCards)
        setCount(prevState => ({ ...prevState, failed: prevState.failed + 1 }))
        break
      }
      case 'wrong': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
        break
      }
      case 'correct': {
        setCount(prevState => ({ ...prevState, failed: prevState.failed + 1, success: prevState.success - 1 }))
      }
    }
  }
}
