import setAsSuccessful from './setAsSuccessful'
import setIndexNextCard from './setIndexNextCard'
import setIndexPreviousCard from './setIndexPreviousCard'
import setDelay from './setDelay'
import setAsFailed from './setAsFailed'
import { RETURN_CARD } from '../../actions'
import store from '../../store'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'

const hotkeys = (event, database, setShowHotkeys, setCurrentCard, currentCardIndex, setDatabase, currentCard, failedCards, setFailedCards, dispatch) => {
  console.log(currentCardIndex)
  setShowHotkeys(true)
  const { currentView } = store.getState().options
  switch (event.which) {
    // arrow left
    case 37: {
      setIndexPreviousCard(setCurrentCard, currentCardIndex)
      break
    }
    // arrow right
    case 39: {
      if (currentCard.index < database.length) {
        setIndexNextCard(setCurrentCard, currentCardIndex, database.length)
      }
      break
    }
    // arrow up
    case 38: {
      setAsSuccessful(setDelay, setDatabase, currentCard, setCurrentCard, database.length, failedCards, setFailedCards, dispatch)
      break
    }
    // arrow down
    case 40: {
      setAsFailed(failedCards, setFailedCards, currentCard, setDatabase, setCurrentCard, database.length, dispatch)
      break
    }
    // 0
    case 96: {
      dispatch({ type: RETURN_CARD, isRecto: currentView.isRecto })
      break
    }
    default: {
      console.log(event.which)
    }
  }
}
export default hotkeys
