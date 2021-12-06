import { RESET_CARD } from '../../actions'
import store from '../../store'
import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { updateCount } from './updateCount'
const setAsSuccessful = (setDelay, setDatabase, currentCard, setCurrentCard, setCount, databaseLength, dispatch) => {
  const { defaultView } = store.getState().options
  const { isConnected } = store.getState().user
  if (currentCard.index < databaseLength) {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    if (isConnected) {
      setDelay(currentCard, 'post', dispatch)
    }
    setResponseStatus(setDatabase, currentCard.id, true)
    setIndexNextCard(setCurrentCard, currentCard.index, databaseLength)
    updateCount(currentCard.response, 'correct', setCount)
  }
}
export default setAsSuccessful
