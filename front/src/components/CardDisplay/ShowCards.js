import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import RectoVerso from '../RectoVerso'
import MDEditor from '@uiw/react-md-editor'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'

const ShowCards = ({database, addFailedCards, failedCards }) => {
  const { deckId, cardId } = useParams()
  // console.log("database", database)
  const dispatch = useDispatch();
  const { defaultView, currentView } = useSelector((state) => state.card)
  const [nextCard, setNextCard] = useState("/");
  let cardsNumberInDeck = database.length;
  const allCards = database
  console.log(allCards)
  let nextCardURL ="/"
  useEffect(()=> {
    setNextCard(Math.floor(cardsNumberInDeck*Math.random()));
    // if(cardsNumberInDeck===randomNextCardId){
    //   cardsNumberInDeck = cardsNumberInDeck-1;
    // }
    if (nextCard>=cardsNumberInDeck){

    }

    console.log({nextCard})

  }, [cardsNumberInDeck])

    // randomNextCardId = Math.floor(cardsNumberInDeck*Math.random());

    // cardContent = database['cards'].find((card)=> card.id == cardId)



  const handleClickReturn = () => {
  dispatch({type:RETURN_CARD, isRecto: currentView.isRecto})
  }
  const handleClickNext = () => {
    dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
    database.splice(cardId, 1)
  }
  const showedCard = database[cardId]
return  <>
  <div style={{margin:"2em"}}> <h1>Je veux voir en premier </h1>
  <RectoVerso />
  </div>
  <div className="card" onClick={handleClickReturn}>

  {currentView.isRecto?
    <pre>
  <MDEditor.Markdown source={database[cardId]["recto"]} />
  </pre>
  :
  <pre> 
  <MDEditor.Markdown source={database[cardId]["verso"]} />
  </pre>
  }
  </div>
  <p style={{fontSize: "1.5em"}}> Cartes restantes: {cardsNumberInDeck-1}</p>
  <Next failedCards={failedCards} database={database} showedCard={showedCard} nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} handleClickNext={handleClickNext} cardsNumberInDeck={cardsNumberInDeck} addFailedCards={addFailedCards}/>
  </>
}
export default ShowCards