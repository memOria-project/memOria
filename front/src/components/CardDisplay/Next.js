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

  console.log("sans modif", nextCard);



return (
  <div>
    {cardsNumberInDeck>0&&
      (<>
        <button onClick={()=>handleClickNext()}>
          <NavLink to={nextCardURL} > J'ai eu bon! </NavLink>
        </button>
        {!isFailed?
          <button onClick={()=>handleClickFail()}>
            <NavLink to={nextCardURL} > J'ai eu faux!</NavLink>
          </button>
        :
        <button onClick={()=>handleClickNext()}>
          <NavLink to={nextCardURL} > Encore raté(sauvegarde serveur) </NavLink>
        </button>
        }
      </>)
 }
  </div>
)


}
export default Next