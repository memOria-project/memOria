import { RESET_CARD } from '../../actions'
import store from '../../store'
import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import removeFailedCard from './removeFailedCards'

const setAsSuccessful = (setDelay, setDatabase, currentCard, setCurrentCard, databaseLength, failedCards, setFailedCards, dispatch) => {
  const { defaultView } = store.getState().options
  const { isConnected } = store.getState().user
  if (currentCard.index < databaseLength) {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    if (isConnected) {
      setDelay(currentCard, 'post', dispatch)
    }
    setResponseStatus(setDatabase, currentCard.id, true)
    setIndexNextCard(setCurrentCard, currentCard.index, databaseLength)
    if (currentCard.response === 'wrong') {
      removeFailedCard(currentCard, failedCards, setFailedCards)
    }
  }
}
export default setAsSuccessful
