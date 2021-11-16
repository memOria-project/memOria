import { RESET_CARD } from '../../actions'
import store from '../../store'
import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'

const setAsSuccessful = (setDelay, setDatabase, currentCard, setCurrentCard, setCount, dispatch) => {
  const { defaultView } = store.getState().options
  const { isConnected } = store.getState().user
  dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })

  if (isConnected) {
    setDelay(currentCard, dispatch)
  }
  setResponseStatus(setDatabase, currentCard.id, true)
  setIndexNextCard(setCurrentCard, currentCard.index)
  switch (currentCard.response) {
    case 'notPicked': {
      setCount(prevState => ({ ...prevState, success: prevState.success + 1 }))
      break
    }
    case 'wrong': {
      setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
      break
    }
    case 'correct': {
      console.log('card response confirmed')
    }
  }
}
export default setAsSuccessful
