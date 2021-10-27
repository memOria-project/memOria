import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCalendarCheck  } from '@fortawesome/free-solid-svg-icons'
import { FETCH_CARDS, RESET_CARD, PICK_NEW_GAME, DELAY_CARD } from '../../actions'
import { useRef } from 'react'
const Next = ({ delayedCardsLength,initialLength, failedCards, database, nextCard, deckId, cardsNumberInDeck, setNextCard, showedCard, addFailedCards }) => {
  // if(nextCard >=cardsNumberInDeck-1) {
  //   setNextCard(cardsNumberInDeck-2)
  //   console.log("after modif", nextCard)
  // }
  
  const delayedCardsInitial = useRef(database.length)
 
  const dispatch = useDispatch()
  const { defaultView, currentView, isFailed } = useSelector((state) => state.card)
  const {isDelayedReviewOn} = useSelector((state)=>state.card)
  const {isConnected} = useSelector((state)=>state.user)
  const {cardId} = useParams()
  const nextCardURL = () => { if(nextCard >=cardsNumberInDeck || nextCard === 0) {
    return `/deck/${deckId}/${nextCard}`
  } else {
    return `/deck/${deckId}/${nextCard-1}`
  }
}
// const deckLength = useSelector(state => state.currentDeck).deck_length
// const goodCards = deckLength- failedCards.length
// console.log(goodCards)

let delayedCardsLengthInitial
if(isDelayedReviewOn)
{
delayedCardsLengthInitial = delayedCardsInitial.current
}
const handleClickNext = () => {

  dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})

  if(isConnected)
  {
dispatch({type: DELAY_CARD, id: showedCard.id })
console.log("card delayed")
  }
  database.splice(cardId, 1)

  console.log("la carte suivante a été enclenché, il y a maintenant", database.length, "cartes")
}

  const handleClickFail = () => {
    dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})

    database.splice(cardId, 1)
    addFailedCards(showedCard)
  }
  if(isDelayedReviewOn){
    console.log({delayedCardsLength, delayedCardsLengthInitial, database: database.length, failedCards: failedCards.length })

  }
  else{
  console.log({initialLength, database: database.length, failedCards: failedCards.length })
  }
  const resetIfDelayOn = (initialLength-database.length)
  if(database.length === delayedCardsLengthInitial)
  {

  }
  const howManyGoods = !isDelayedReviewOn?initialLength-database.length-failedCards.length
  :delayedCardsLength-failedCards.length-database.length

  const howManyBads = failedCards.length

return (
  <div>
    {cardsNumberInDeck>0&&
      (<>
        <button className="confirm" onClick={()=>handleClickNext()}>
          <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faCalendarCheck}/> {howManyGoods}</NavLink>
        </button>
          <button className="warning" onClick={()=>handleClickFail()}>
            <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faTimesCircle} /> {howManyBads}</NavLink>
          </button>

      </>)
 }
  </div>
)


}
export default Next