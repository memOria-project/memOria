import setAsSuccessful from './setAsSuccessful'
import setIndexNextCard from './setIndexNextCard'
import setIndexPreviousCard from './setIndexPreviousCard'
import setDelay from './setDelay'
const hotkeys = (event, setCurrentCard, currentCardIndex, setDatabase, setCount, currentCard, dispatch) => {
  console.log(currentCardIndex)
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
    }
    default: {
      console.log("we're good")
    }
  }
}
export default hotkeys
