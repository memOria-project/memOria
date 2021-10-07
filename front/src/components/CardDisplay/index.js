import './CardDisplay.scss'
import './CardDisplay-Desktop.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'

import ShowCards from './ShowCards'
import Loading from '../Loading'
import Options from './Options'
import NextGame from './NextGame'

const CardDisplay = () => {
  const dispatch = useDispatch()
  // use URl parameters to determine the card to display from deck and card id
  const { deckId } = useParams()
  const delayedIds = useSelector((state) => state.user.delayedCards)
  const allCards = useSelector(state => state.currentDeck).currentDeckContent.cards
  const deckTitle = useSelector(state => state.currentDeck).currentDeckContent.title

  // Fetch all cards from the selected deck
  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
    dispatch({ type: FETCH_CARDS })
  }, [])
  // Trigger loading while the cards are not fetched
  useEffect(() => {
    if (allCards?.length) {
      setLoading(false)
    }

    if(allCards?.length&&delayedIds?.length) {
      const delayedCardsWithNulls = allCards.map((card)=> {
        const myCard = delayedIds.indexOf(card.id)
        if(myCard != -1){
          return card
        }
        else{
          return null
        }
        })
      const delayedCardsFinal = delayedCardsWithNulls.filter((value)=> value != null)
      console.log({delayedCardsWithNulls, delayedCards})
      setDelayedCards(delayedCardsFinal);
  }
  }, [allCards, delayedIds])

  const isFailed = useSelector((state) => state.card.isFailed)
  const {isAlternateRequired, isDelayedReviewOn } = useSelector((state) => state.card)
  const [initialFailedCards, setInitialFailedCards] = useState([])
  const [delayedCards, setDelayedCards] = useState([])

  const [alternateFailedCards, setAlternateFailedCards] = useState([])
  const [showOptions, setShowOptions] = useState(true)
  const [loading, setLoading] = useState(true)

  // "database" will be passed as props to the MD Editor and contains all the cards to be displayed
  let database = [{ recto: 'recto', verso: 'verso' }] ?? [{ recto: 'recto', verso: 'verso' }] // avoid undefined error when the user removed the last card from the deck while browsing
  
  


  const selectDatabase = () => {
    if (isAlternateRequired) {
      console.log({ database, alternateFailedCards })
      database = alternateFailedCards
    } else if (isFailed) {
      database = initialFailedCards
    } 
    else if (isDelayedReviewOn) {
      database = delayedCards
      console.log("delayedCards activated!")
    } 
    else if (!isFailed) {
      database = allCards
    }
  }
  selectDatabase()
  // "databaseFailedCards" will be passed as props to the MD Editor and contains the array with the "missed cards"
  let databaseFailedCards
  const selectFailedCards = () => {
    if (isAlternateRequired) {
      databaseFailedCards = initialFailedCards
    } else if (isFailed) {
      databaseFailedCards = alternateFailedCards
    } else if (!isFailed && !isAlternateRequired) {
      databaseFailedCards = initialFailedCards
    }
  }
  selectFailedCards()
  //  Triggers the modal offering the "next games" options: start again with all the cards, or check the missed ones
  const checkIfOver = () => {
    if (database?.length === 0) {
      return true
    } else {
      console.log({ isFailed, databaseFailedCards })
      return false
    }
  }

  const isOver = checkIfOver()
  // is called when a user clicks on "I missed"
  const addFailedCards = (card) => {
    if (isFailed) {
      setAlternateFailedCards((state) => [...state, card])
    } else {
      setInitialFailedCards((state) => [...state, card])
    }
  }

  return (<div>
          {showOptions &&
            <div className="cardDisplay__modal">
              <Options setShowOptions={setShowOptions} />
            </div>
          }

          {database?.length >= 1 &&
            (<>
            <p className="deck__title">{deckTitle} </p>
            <ShowCards database={database} addFailedCards={addFailedCards} failedCards={databaseFailedCards} />
            </>)
          }
          {isOver &&
            <NextGame isAlternateRequired={isAlternateRequired} isFailed={isFailed} failedCards={databaseFailedCards} alternateFailedCards={alternateFailedCards} />}

          {loading &&
            <Loading />
          }

           </div>)
}

export default CardDisplay

//  with a testing fake database
// let database = {
//  "1":{
//   "name":"TestDeck",
//   "1":{
//      "recto":"1515",
//      "verso":"Marignan"
//   },
//   "2":{
//      "recto":"1492",
//      "verso":"Découverte de l'Amérique"
//   },
//   "3":{
//      "recto":"1789",
//      "verso":"Chute de la Bastille"
//   },
//   "4":{
//      "recto":"1815",
//      "verso":"Waterloo"
//   },
//   "5":{
//      "recto":"1914",
//      "verso":"Guerre mondiale"
//   },
//  "6":{
//     "recto":"recto6",
//     "verso":"verso6"
//  },
//  "7":{
//     "recto":"recto7",
//     "verso":"verso7"
//  },
//  "8":{
//     "recto":"recto8",
//     "verso":"verso8"
//  },
//  "9":{
//     "recto":"recto9",
//     "verso":"verso9"
//  },
//  "10":{
//     "recto":"recto10",
//     "verso":"verso10"
//  }
//  }
// }
