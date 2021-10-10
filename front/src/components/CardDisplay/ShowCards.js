import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import RectoVerso from './RectoVerso'
import MDEditor from '@uiw/react-md-editor'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'
import ReactCardFlip from 'react-card-flip'
import { set } from 'react-hook-form'

const ShowCards = ({database, addFailedCards, failedCards }) => {
  const { deckId, cardId } = useParams()
  // console.log("database", database)
  const dispatch = useDispatch();
  const { defaultView, currentView } = useSelector((state) => state.card)
  const {isRecto, isVerso} = currentView
  const [nextCard, setNextCard] = useState("/");
  const [cardFlip, setCardFlip] = useState(false)
  let cardsNumberInDeck = database.length;
  const allCards = database

  const myCard = database[cardId] ?? [{recto:"recto", verso:"verso"}]
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
      setCardFlip((state)=>!state);
      dispatch({type:RETURN_CARD, isRecto: currentView.isRecto})
      }


  const showedCard = database[cardId]
return  <>
  <ReactCardFlip isFlipped={cardFlip} flipDirection="horizontal">

  <div className="card" onClick={handleClickReturn}>
    <pre style={{hidden:!isRecto}}>
      <MDEditor.Markdown source={myCard["recto"]} />
    </pre>
  </div>
  <div className="card" onClick={handleClickReturn}>
    <pre style={{hidden:isRecto}}> 
      <MDEditor.Markdown source={myCard["verso"]} />
    </pre>
  </div>
  </ReactCardFlip>

  <Next failedCards={failedCards} database={database} showedCard={showedCard} nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} cardsNumberInDeck={cardsNumberInDeck} addFailedCards={addFailedCards}/>
  <p style={{fontSize: "1.5em"}}> Cartes restantes: {cardsNumberInDeck-1}</p>
  </>
}
export default ShowCards