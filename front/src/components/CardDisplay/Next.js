import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import { FETCH_CARDS, RESET_CARD, EDIT_OPTIONS } from '../../actions'

const Next = ({ failedCards, database, nextCard, deckId,  handleClickNext, cardsNumberInDeck, setNextCard, showedCard, addFailedCards }) => {
  // if(nextCard >=cardsNumberInDeck-1) {
  //   setNextCard(cardsNumberInDeck-2)
  //   console.log("after modif", nextCard)
  // }
  const { defaultView, currentView, isFailed } = useSelector((state) => state.card)
  const {cardId} = useParams()
  const dispatch = useDispatch()
  const firstCardURL= `/deck/${deckId}/0`
  const nextCardURL = () => { if(nextCard >=cardsNumberInDeck || nextCard === 0) {
    return `/deck/${deckId}/${nextCard}`
  } else {
    return `/deck/${deckId}/${nextCard-1}`
  }
}
  const handleClickFail = () => {
    handleClickNext();
    addFailedCards(showedCard)
  }

  const handleClickCheckFail = () => {
    dispatch({type:EDIT_OPTIONS, isFailed:true})
    console.log({cardId})
    database.splice(cardId, 1)

  }

  const handleClickRestart = () => {
    dispatch({type:FETCH_CARDS, deckId})
    dispatch({type:EDIT_OPTIONS, isFailed:false})
  }
  console.log("sans modif", nextCard);

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

return (<div>

        {cardsNumberInDeck>1?(<>
          <button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > J'ai eu bon! </NavLink>
               </button>
          {!isFailed?
            <button onClick={()=>handleClickFail()}> <NavLink to={nextCardURL} > J'ai eu faux!  </NavLink></button>
            : <button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > Encore raté(sauvegarde serveur) </NavLink></button>}
          </>)
        :(<><button onClick={()=>handleClickRestart()}> Recommence </button>
          {check?
            <button onClick={()=>handleClickCheckFail()}> <NavLink to={firstCardURL}> essaye tes cartes ratées</NavLink></button>
            :console.log("only possible to restart")}
        </>)}
        

        </div>
)


}
export default Next