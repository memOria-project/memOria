import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useParams} from 'react-router-dom'
import { FETCH_CARDS, RESET_CARD, EDIT_OPTIONS } from '../../actions'

const Next = ({ database, nextCard, deckId,  handleClickNext, cardsNumberInDeck, setNextCard, showedCard, addFailedCards }) => {
  // if(nextCard >=cardsNumberInDeck-1) {
  //   setNextCard(cardsNumberInDeck-2)
  //   console.log("after modif", nextCard)
  // }
  const { defaultView, currentView } = useSelector((state) => state.card)
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
  console.log("sans modif", nextCard);
return (<div>

        {cardsNumberInDeck>1?(<>
          <button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > Carte suivante au hasard dans le paquet </NavLink>
               </button>
          <button onClick={()=>handleClickFail()}> <NavLink to={nextCardURL} > Je sais pas </NavLink></button>
          </>)
        :(<><button onClick={()=>dispatch({type:FETCH_CARDS, deckId})}> Essaye encore </button>
        <button onClick={()=>handleClickCheckFail()}> <NavLink to={firstCardURL}> essaye tes cartes ratées</NavLink></button>
        </>)}
        

        </div>
)


}
export default Next