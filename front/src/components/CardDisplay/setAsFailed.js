import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { DELAY_CARD, RESET_CARD } from '../../actions'
import store from '../../store'
import { updateCount } from './updateCount'
import setDelay from './setDelay'
import addFailedCards from './addFailedCards'

const setAsFailed = (setFailedCards, setCount, currentCard, setDatabase, setCurrentCard, databaseLength, dispatch) => {
  const { defaultView } = store.getState().options
  if (currentCard.index < databaseLength) {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    if (currentCard.response === 'correct') {
      setDelay(currentCard.id, 'delete', dispatch)
    }
    setResponseStatus(setDatabase, currentCard.id, false)
    setIndexNextCard(setCurrentCard, currentCard.index, databaseLength)
    if (currentCard.response === 'notPicked' || currentCard.response === 'correct') {
      addFailedCards(currentCard, setFailedCards)
    }
    // updateCount(currentCard.response, 'wrong', setCount, currentCard, setFailedCards)
  }
}

export default setAsFailed
