import './CardDisplay.scss'
import './CardDisplay-Desktop.scss'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import ShowCards from './ShowCards'
import { orderedListCommand } from '@uiw/react-md-editor'

// import jsonTestDatabase from '../../assets/jsonTestDatabase';
// Display zone for cards. Cards from a Deck are displayed one by one.
// User can choose to switch to card verso and vice versa.
const CardDisplay = () => {
  const dispatch = useDispatch()
  // use URl parameters to determine the card to display from deck and card id
  const { deckId, cardId } = useParams()
  // const [nextCard, setNextCard] = useState();
  // Set the current deck id in the state
  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
  }, [])

  useEffect(() => {
    dispatch({ type: FETCH_CARDS })
  }, [deckId])

let database = useSelector(state => state.currentDeck).currentDeckContent
const isFailed = useSelector(state=> state.card.isFailed)

const [failedCards, setFailedCards] = useState([])
  const addFailedCards = (card) => {
    setFailedCards((state) => [...state, card])
    console.log("failedCards:", failedCards)
  }

  return (database&&database['cards'].length>=1?
            (<>
            <p className="deck__title">{database["title"]} </p>
            <ShowCards database={database["cards"]} addFailedCards={addFailedCards} failedCards={failedCards} />
            </>)
            :isFailed?
            <p className="deck__title">{database["title"]} </p>
            <ShowCards database={failedCards} addFailedCards={addFailedCards} failedCards={failedCards}  />
              :<p>Loading</p>)
  }

export default CardDisplay

  //with a testing fake database
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