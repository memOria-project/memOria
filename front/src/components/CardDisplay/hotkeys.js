import setAsSuccessful from './setAsSuccessful'
import setIndexNextCard from './setIndexNextCard'
import setIndexPreviousCard from './setIndexPreviousCard'
import setDelay from './setDelay'
import setAsFailed from './setAsFailed'

const hotkeys = (event, setShowHotkeys, setCurrentCard, currentCardIndex, setDatabase, setCount, currentCard, setFailedCards, dispatch) => {
  console.log(currentCardIndex)
  setShowHotkeys(true)
  switch (event.which) {
    // arrow left
    case 37: {
      setIndexPreviousCard(setCurrentCard, currentCardIndex)
      break
    }
    // arrow right
    case 39: {
      setIndexNextCard(setCurrentCard, currentCardIndex)
      console.log(currentCardIndex)
      break
    }
    // arrow up
    case 38: {
      setAsSuccessful(setDelay, setDatabase, currentCard, setCurrentCard, setCount, dispatch)
      break
    }
    // arrow down
    case 40: {
      setAsFailed(setFailedCards, setCount, currentCard, setDatabase, setCurrentCard, dispatch)
    }
    default: {
      console.log("we're good")
    }
  }
}
export default hotkeys
