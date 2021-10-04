import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import RectoVerso from '../RectoVerso'
import MDEditor from '@uiw/react-md-editor'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'

const ShowCards = ({database}) => {
  const { deckId, cardId } = useParams()
  const dispatch = useDispatch();
  const { defaultView, currentView } = useSelector((state) => state.card)
  const [nextCard, setNextCard] = useState("/");
  let cardsNumberInDeck = database["cards"].length;
  const allCards = database["cards"]
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
    database['cards'].splice(cardId, 1)
  }

return  <>
  <p className="deck__title">{database["title"]} </p>
  <div style={{margin:"2em"}}> <h1>Je veux voir en premier </h1>
  <RectoVerso />
  </div>
  <p style={{fontSize: "1.5em"}}> Encore {cardsNumberInDeck} cartes</p>
  <div className="card">

  {currentView.isRecto?
    <pre>
  <MDEditor.Markdown source={database["cards"][cardId]["recto"]} />
  </pre>
  :
  <pre> 
  <MDEditor.Markdown source={database["cards"][cardId]["verso"]} />
  </pre>
  }</div>
  <button onClick={handleClickReturn}>Retourner</button>
  <Next nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} handleClickNext={handleClickNext} cardsNumberInDeck={cardsNumberInDeck} />
  </>
}
export default ShowCards