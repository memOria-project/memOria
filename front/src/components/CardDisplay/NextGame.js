import { FETCH_CARDS, PICK_NEW_GAME, CHECK_TOKEN } from '../../actions'
import { useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import setIndexPreviousCard from './setIndexPreviousCard'

const NextGame = ({ failedCards, currentCard, setCurrentCard, database, setFailedCards, setCount }) => {
  const { cardId, deckId } = useParams()

  const handleClickCheckFail = () => {
    dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'FAILED_1ST_ROUND' })
    setCount(prevState => ({ ...prevState, restart: prevState.restart + 1 }))
    const { id, recto, verso } = database[0]

    setCurrentCard({ index: 0, id, recto, verso })

    dispatch({ type: CHECK_TOKEN })
  }

  const handleClickRestart = () => {
    dispatch({ type: FETCH_CARDS, deckId })
    setFailedCards([])
    dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })
    const { id, recto, verso } = database[0]
    setCurrentCard({ index: 0, id, recto, verso })
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
    }<br />
    <button className="information" onClick={() => setIndexPreviousCard(setCurrentCard, currentCard.index)}>
      Retour
    </button>
    </div>
  </div>)
}
export default NextGame
