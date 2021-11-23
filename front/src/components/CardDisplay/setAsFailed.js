
import addFailedCards from './addFailedCards'
import setResponseStatus from './setResponseStatus'
import setIndexNextCard from './setIndexNextCard'
import { RESET_CARD } from '../../actions'
import store from '../../store'

const setAsFailed = (setFailedCards, setCount, currentCard, setDatabase, setCurrentCard, dispatch) => {
  const { defaultView } = store.getState().options
  dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
  switch (currentCard.response) {
    case 'notPicked': {
      addFailedCards(currentCard, setFailedCards)
      setCount(prevState => ({ ...prevState, failed: prevState.failed + 1 }))
      break
    }
    case 'wrong': {
      setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
      break
    }
    case 'correct': {
      setCount(prevState => ({ ...prevState, failed: prevState.failed + 1, success: prevState.success - 1 }))
    }
  }
  setResponseStatus(setDatabase, currentCard.id, false)
  setIndexNextCard(setCurrentCard, currentCard.index)
}

export default setAsFailed
