import setIndexPreviousCard from './setIndexPreviousCard'

const hotkeys = (event, setCurrentCard, currentCardIndex) => {
  switch (event.which) {
    case 37: {
      setIndexPreviousCard(setCurrentCard, currentCardIndex)
      break
    }
    default: {
      console.log("we're good")
    }
  }
}
export default hotkeys
