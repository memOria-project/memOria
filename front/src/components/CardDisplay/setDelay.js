import { DELAY_CARD } from '../../actions'

const setDelay = (currentCard, method, dispatch) => {
  dispatch({ type: DELAY_CARD, id: currentCard.id, method })
}

export default setDelay
