import './CardDisplay.scss'
import './CardDisplay-Desktop.scss'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import ShowCards from './ShowCards'

import { orderedListCommand } from '@uiw/react-md-editor'
import Loading from '../Loading'
import Options from './Options'
import NextGame from './NextGame'
// import jsonTestDatabase from '../../assets/jsonTestDatabase';
// Display zone for cards. Cards from a Deck are displayed one by one.
// User can choose to switch to card verso and vice versa.
const CardDisplay = () => {
  const dispatch = useDispatch()
  // use URl parameters to determine the card to display from deck and card id
  const { deckId, cardId } = useParams()
  // const [nextCard, setNextCard] = useState();
  // Set the current deck id in the state
  const allCards = useSelector(state => state.currentDeck).currentDeckContent.cards 
  const deckTitle = useSelector(state => state.currentDeck).currentDeckContent.title
  

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
    dispatch({ type: FETCH_CARDS })
  }, [])
  useEffect(()=> {
    if(allCards?.length){
      setLoading(false)
    }
  }, [allCards])


const isFailed = useSelector(state=> state.card.isFailed) 
const isAlternateRequired = useSelector((state)=> state.card.isAlternateRequired)
const [initialFailedCards, setInitialFailedCards] = useState([])
const [alternateFailedCards, setAlternateFailedCards] = useState([])
const [showOptions, setShowOptions] = useState(true)
const [loading, setLoading] = useState(true)

let database = [{recto: "recto", verso:"verso"}] ?? [{recto: "recto", verso:"verso"}] 
const selectDatabase = () => {

  if(isAlternateRequired) {
    console.log({database, alternateFailedCards})

    database= alternateFailedCards
  }
  else if(isFailed) {
    database=initialFailedCards
  }
  else if(!isFailed) {
    database= allCards
  }
}
  selectDatabase()
  let databaseFailedCards
  const selectFailedCards = () => {
    if (isAlternateRequired) {
      databaseFailedCards = initialFailedCards
    }
    else if (isFailed) {
      databaseFailedCards = alternateFailedCards
    }
    else if (!isFailed&&!isAlternateRequired) {
      databaseFailedCards = initialFailedCards
    }
}
selectFailedCards()

const checkIfOver = () => {
  // if(!isFailed&&database?.length === 0 || isFailed&&initialFailedCards.length === 0 || isAlternateRequired&&alternateFailedCards.length === 0)
  if(database?.length === 0)
  {
    return true
  }

  else {
    console.log({isFailed, databaseFailedCards})
    return false
  }
}

const isOver = checkIfOver()

const addFailedCards = (card) => {
  if(isFailed) {
    setAlternateFailedCards((state)=> [...state, card])
  }

  else{
    setInitialFailedCards((state) => [...state, card])
  }
  }

  return (<div>
          {showOptions&&
          <div className="cardDisplay__modal"> 
            <Options setShowOptions={setShowOptions} />
          </div>}

          {database?.length>=1&&
            (<>
            <p className="deck__title">{deckTitle} </p>
            <ShowCards database={database} addFailedCards={addFailedCards} failedCards={databaseFailedCards} />
            </>)}
          {isOver && 
            <NextGame isAlternateRequired={isAlternateRequired} isFailed={isFailed} failedCards={databaseFailedCards} alternateFailedCards={alternateFailedCards} />}

          {loading&&<Loading />}

           </div>)
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