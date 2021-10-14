import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS, DELAY_CARD } from '../../actions'
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
import { useSwipeable } from 'react-swipeable';

const ShowCards = ({database, cardId, addFailedCards, failedCards }) => {
  const { deckId } = useParams()
  // console.log("database", database)
  const dispatch = useDispatch();
  const { defaultView, currentView } = useSelector((state) => state.card)
  const { isConnected } = useSelector((state) => state.user)
  const initialLength = useRef(database.length)
  console.log("longueur", initialLength.current);
  const {isRecto, isVerso} = currentView
  const [nextCard, setNextCard] = useState("/");
  let cardsNumberInDeck = database.length;

  const myCard = database[cardId] ?? [{recto:"recto", verso:"verso"}]
  let nextCardURL ="/"
  useEffect(()=> {
    setNextCard(Math.floor(cardsNumberInDeck*Math.random()));
    // if(cardsNumberInDeck===randomNextCardId){
    //   cardsNumberInDeck = cardsNumberInDeck-1;
    // }
    if (nextCard>=cardsNumberInDeck){

    }


  }, [cardsNumberInDeck])

    // randomNextCardId = Math.floor(cardsNumberInDeck*Math.random());

    // cardContent = database['cards'].find((card)=> card.id == cardId)

    const handleClickReturn = () => {
      dispatch({type:RETURN_CARD, isRecto: currentView.isRecto})
      
      }

// Copier/Coller de Next.js, pour faire marcher le swipe. Idéalement, il faudrait avoir ces fonctions dans des modules séparés, ou au moins les supprimer de Next.js et les faire passer en props.

  const handleClickNext = () => {
        dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
        database.splice(cardId, 1)
      }
      
  // const handleClickFail = () => {
  //     dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
  //     if(isConnected)
  //       {
  //     dispatch({type: DELAY_CARD, id: showedCard.id })
  //       }
  //     database.splice(cardId, 1)
  //     addFailedCards(showedCard)
  //       }



//? swiper. Il faut aussi activer ...handlers dans les divs
  // const handlers = useSwipeable({

  //   onSwipedDown: handleClickFail,
  //   onSwipedUp: handleClickNext,
  //   // trackMouse:true
  // })
//? fin swiper

  const showedCard = database[cardId]

  const cardClass= classNames({
    card: true,
    "card__recto": isRecto,
    "card__verso": !isRecto
  })







return  <>
{isRecto?
  <motion.div 
  // {...handlers}
    className={cardClass}
    onClick={handleClickReturn}
    >
    <pre className="card__content">
      <MDEditor.Markdown source={myCard["recto"]} />
    </pre>
  </motion.div>
:
  <motion.div 
  // {...handlers}
  animate={{rotateY:180}}
  className={cardClass} onClick={handleClickReturn}>
    <motion.pre 
    className="card__content"
    animate={{rotateY:180}}>
      <MDEditor.Markdown source={myCard["verso"]} />
    </motion.pre>
  </motion.div>
}
  <Next initialLength={initialLength.current} failedCards={failedCards} database={database} showedCard={showedCard} nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} cardsNumberInDeck={cardsNumberInDeck} addFailedCards={addFailedCards}/>
  <p style={{fontSize: "1.5em"}}> Cartes restantes: {cardsNumberInDeck-1}</p>
  </>
}
export default ShowCards