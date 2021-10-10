import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS } from '../../actions'
import RectoVerso from './RectoVerso'
import MDEditor from '@uiw/react-md-editor'
import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'
import ReactCardFlip from 'react-card-flip'
import { set } from 'react-hook-form'
import { motion } from "framer-motion"
import classNames from 'classnames'

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

  const cardClass= classNames({
    card: true,
    "card__recto": isRecto,
    "card__verso": !isRecto
  })

return  <>
{isRecto?
  <motion.div 
  className={cardClass} onClick={handleClickReturn}>
    <pre>
      <MDEditor.Markdown source={myCard["recto"]} />
    </pre>
  </motion.div>
:
  <motion.div
  animate={{rotateY:180}}
  className={cardClass} onClick={handleClickReturn}>
    <motion.pre animate={{rotateY:180}}>
      <MDEditor.Markdown source={myCard["verso"]} />
    </motion.pre>
  </motion.div>
}
  <Next failedCards={failedCards} database={database} showedCard={showedCard} nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} cardsNumberInDeck={cardsNumberInDeck} addFailedCards={addFailedCards}/>
  <p style={{fontSize: "1.5em"}}> Cartes restantes: {cardsNumberInDeck-1}</p>
  </>
}
export default ShowCards