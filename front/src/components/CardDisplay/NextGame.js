import {FETCH_CARDS, EDIT_OPTIONS, CHECK_TOKEN} from '../../actions'
import {useDispatch} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

const NextGame = ({isFailed, failedCards, setIsAlternateRequired, alternateFailedCards, isAlternateRequired}) => {
  const {cardId, deckId} = useParams()
  const handleClickCheckFail = () => {
    if(isFailed) {
      dispatch({type:EDIT_OPTIONS, field:"isFailed", value:false})

      dispatch({type:EDIT_OPTIONS, field:"isAlternateRequired", value:true})

      console.log({isFailed, isAlternateRequired, alternateFailedCards})
    }
    else if(isAlternateRequired) {
      dispatch({type:EDIT_OPTIONS, field:"isFailed", value:true})
      dispatch({type:EDIT_OPTIONS, field:"isAlternateRequired", value:false})

    }
    else{
    dispatch({type:EDIT_OPTIONS, field:"isFailed", value:true})
    }
    // database.splice(cardId, 1)
  }

  const handleClickRestart = () => {
    dispatch({type:FETCH_CARDS, deckId})
    dispatch({type:EDIT_OPTIONS, field:"isFailed", value:false})
    dispatch({type:EDIT_OPTIONS, field:"isAlternateRequired", value:false})
  }

  const isRecheckAllowed = () => {
    if(failedCards.length === 0)
    {
      return false
    }
    else {
      return true
    }
  }
  const check = isRecheckAllowed();
  const firstCardURL = `/deck/${deckId}/0`
  const dispatch = useDispatch()
  dispatch({type: CHECK_TOKEN })

  return (
  <div class="cardDisplay__modal">
    <h1>Paquet terminé ! Bravo!  </h1>
    <button onClick={()=>handleClickRestart()}> Revoir toutes les cartes </button> <br />
    {check&&
    <button onClick={()=>handleClickCheckFail()}>
      <NavLink to={firstCardURL}> Voir les {failedCards.length} cartes non apprises</NavLink>
    </button>
    }
  </div>)
}
export default NextGame
