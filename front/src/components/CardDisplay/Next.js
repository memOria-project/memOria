import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { FETCH_CARDS, RESET_CARD, EDIT_OPTIONS, DELAY_CARD } from '../../actions'

const Next = ({ failedCards, database, nextCard, deckId, cardsNumberInDeck, setNextCard, showedCard, addFailedCards }) => {
  // if(nextCard >=cardsNumberInDeck-1) {
  //   setNextCard(cardsNumberInDeck-2)
  //   console.log("after modif", nextCard)
  // }
  const dispatch = useDispatch()
  const { defaultView, currentView, isFailed } = useSelector((state) => state.card)
  const {isConnected} = useSelector((state)=>state.user)
  const {cardId} = useParams()
  const nextCardURL = () => { if(nextCard >=cardsNumberInDeck || nextCard === 0) {
    return `/deck/${deckId}/${nextCard}`
  } else {
    return `/deck/${deckId}/${nextCard-1}`
  }
}

const handleClickNext = () => {
  dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
  database.splice(cardId, 1)
  console.log({failedCards})
}

  const handleClickFail = () => {
    dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
    if(isConnected)
      {
    dispatch({type: DELAY_CARD, id: showedCard.id })
      }
    database.splice(cardId, 1)
    addFailedCards(showedCard)
  }

  console.log("sans modif", nextCard);



return (
  <div>
    {cardsNumberInDeck>0&&
      (<>
        <button onClick={()=>handleClickNext()}>
          <NavLink to={nextCardURL} > J'ai eu bon!</NavLink>
        </button>
          <button onClick={()=>handleClickFail()}>
            <NavLink to={nextCardURL} > J'ai eu faux! ({failedCards.length})</NavLink>
          </button>

      </>)
 }
  </div>
)


}
export default Next