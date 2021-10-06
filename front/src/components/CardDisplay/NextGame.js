import {FETCH_CARDS, EDIT_OPTIONS} from '../../actions'
import {useDispatch} from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

const NextGame = ({isFailed, failedCards}) => {
  const {cardId, deckId} = useParams()
  const handleClickCheckFail = () => {
    dispatch({type:EDIT_OPTIONS, isFailed:true})
    console.log({cardId})
    // database.splice(cardId, 1)
  }

  const handleClickRestart = () => {
    dispatch({type:FETCH_CARDS, deckId})
    dispatch({type:EDIT_OPTIONS, isFailed:false})
  }

  const isRecheckAllowed = () => {
    if(isFailed || failedCards.length<1)
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

  return (
  <div class="cardDisplay__modal">
    <button onClick={()=>handleClickRestart()}> Recommence </button>
    {check&&
    <button onClick={()=>handleClickCheckFail()}>
      <NavLink to={firstCardURL}> essaye tes cartes ratées</NavLink>
    </button>
    }
  </div>)
}
export default NextGame
