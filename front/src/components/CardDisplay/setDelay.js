import { DELAY_CARD } from '../../actions'

const setDelay = (currentCard, dispatch) => {
  dispatch({ type: DELAY_CARD, id: currentCard.id })
}

export default setDelay
