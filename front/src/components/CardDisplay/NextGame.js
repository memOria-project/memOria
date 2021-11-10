import { FETCH_CARDS, PICK_NEW_GAME, CHECK_TOKEN } from '../../actions'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

const NextGame = ({ setInitialFailedCards, isFailed, failedCards, setIsAlternateRequired, alternateFailedCards, isAlternateRequired }) => {
  const { cardId, deckId } = useParams()
  const handleClickCheckFail = () => {
    if (isFailed) {
      dispatch({ type: PICK_NEW_GAME, field: 'isFailed', value: false })

      dispatch({ type: PICK_NEW_GAME, field: 'isAlternateRequired', value: true })
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'FAILED_2ND_ROUND' })
      console.log({ isFailed, isAlternateRequired, alternateFailedCards })
    } else if (isAlternateRequired) {
      dispatch({ type: PICK_NEW_GAME, field: 'isFailed', value: true })
      dispatch({ type: PICK_NEW_GAME, field: 'isAlternateRequired', value: false })
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'FAILED_1ST_ROUND' })
    } else {
      dispatch({ type: PICK_NEW_GAME, field: 'isFailed', value: true })
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'FAILED_1ST_ROUND' })
    }
    // database.splice(cardId, 1)
    dispatch({ type: CHECK_TOKEN })
  }

  const handleClickRestart = () => {
    dispatch({ type: FETCH_CARDS, deckId })
    setInitialFailedCards([])
    dispatch({ type: PICK_NEW_GAME, field: 'isFailed', value: false })
    dispatch({ type: PICK_NEW_GAME, field: 'isAlternateRequired', value: false })
    dispatch({ type: PICK_NEW_GAME, field: 'isDelayedReviewOn', value: false })
    dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })

    dispatch({ type: CHECK_TOKEN })
  }

  const isRecheckAllowed = () => {
    if (failedCards.length === 0) {
      return false
    } else {
      return true
    }
  }
  const check = isRecheckAllowed()
  const firstCardURL = `/deck/${deckId}/0`
  const dispatch = useDispatch()

  return (
  <div className="cardDisplay__modal">
    <div className="cardDisplay__modal__container">
    <h1>Paquet terminé!</h1>
    <h2>Bravo!</h2>
    <button className="confirm" onClick={() => handleClickRestart()}>Revoir toutes les cartes</button> <br />

    {check &&
    <button className="warning" onClick={() => handleClickCheckFail()} >
      <NavLink to={firstCardURL} >Voir les {failedCards.length} cartes non apprises</NavLink>
    </button>
    }
    </div>
  </div>)
}
export default NextGame
