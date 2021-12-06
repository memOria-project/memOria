import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { RESET_CARD } from '../../actions'
import store from '../../store'
import setDelay from './setDelay'
import addFailedCards from './addFailedCards'

const setAsFailed = (failedCards, setFailedCards, currentCard, setDatabase, setCurrentCard, databaseLength, dispatch) => {
  const { defaultView } = store.getState().options
  const isFailedAlready = failedCards.some((card) => card.recto === currentCard.recto && card.verso === currentCard.verso)

  if (currentCard.index < databaseLength) {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    if (currentCard.response === 'correct') {
      setDelay(currentCard, 'delete', dispatch)
    }
    setResponseStatus(setDatabase, currentCard.id, false)
    setIndexNextCard(setCurrentCard, currentCard.index, databaseLength)
    if (!isFailedAlready) {
      addFailedCards(currentCard, setFailedCards)
    }
  }
}

export default setAsFailed
