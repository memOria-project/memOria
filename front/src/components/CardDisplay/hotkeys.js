import setIndexNextCard from './setIndexNextCard'
import setIndexPreviousCard from './setIndexPreviousCard'

const hotkeys = (event, setCurrentCard, currentCardIndex) => {
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
    default: {
      console.log("we're good")
    }
  }
}
export default hotkeys
