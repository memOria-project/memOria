import { RESET_CARD } from '../../actions'
import store from '../../store'
import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { updateCount } from './updateCount'
const setAsSuccessful = (setDelay, setDatabase, currentCard, setCurrentCard, setCount, dispatch) => {
  const { defaultView } = store.getState().options
  const { isConnected } = store.getState().user

  dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
  if (isConnected) {
    setDelay(currentCard, dispatch)
  }
  setResponseStatus(setDatabase, currentCard.id, true)
  setIndexNextCard(setCurrentCard, currentCard.index)
  updateCount(currentCard.response, 'correct', setCount)
}
export default setAsSuccessful
