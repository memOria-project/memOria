import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { RESET_CARD } from '../../actions'
import store from '../../store'
import { updateCount } from './updateCount'

const setAsFailed = (setFailedCards, setCount, currentCard, setDatabase, setCurrentCard, databaseLength, dispatch) => {
  const { defaultView } = store.getState().options
  if (currentCard.index < databaseLength) {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    setResponseStatus(setDatabase, currentCard.id, false)
    setIndexNextCard(setCurrentCard, currentCard.index, databaseLength)
    // updateCount inclue aussi la copie de la carte courante dans failedCards. Faire une fonction séparée car pas claire?
    updateCount(currentCard.response, 'wrong', setCount, currentCard, setFailedCards)
  }
}

export default setAsFailed
