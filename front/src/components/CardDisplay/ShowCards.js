import { RETURN_CARD } from '../../actions'
import MDEditor from '@uiw/react-md-editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'
import { motion } from 'framer-motion'
import classNames from 'classnames'
// import { useSwipeable } from 'react-swipeable'

const ShowCards = ({ hideButtons, delayedCardsLength, database, cardId, addFailedCards, failedCards }) => {
  const { deckId } = useParams()
  const dispatch = useDispatch()
  const { currentView } = useSelector((state) => state.options)
  const initialLength = useRef(database.length)
  console.log('longueur', initialLength.current)
  const { isRecto } = currentView
  const [nextCard, setNextCard] = useState('/')
  const cardsNumberInDeck = database.length

  const myCard = database[cardId] ?? [{ recto: 'recto', verso: 'verso' }]
  useEffect(() => {
    setNextCard(Math.floor(cardsNumberInDeck * Math.random()))
    // if(cardsNumberInDeck===randomNextCardId){
    //   cardsNumberInDeck = cardsNumberInDeck-1;
    // }
    if (nextCard >= cardsNumberInDeck) {

    }
  }, [cardsNumberInDeck])

  // randomNextCardId = Math.floor(cardsNumberInDeck*Math.random());

  // cardContent = database['cards'].find((card)=> card.id == cardId)

  const handleClickReturn = () => {
    dispatch({ type: RETURN_CARD, isRecto: currentView.isRecto })
  }

  // ? swiper. Il faut aussi activer ...handlers dans les divs, et import handleClickFail/handleClickNext
  // const handlers = useSwipeable({

  //   onSwipedDown: handleClickFail,
  //   onSwipedUp: handleClickNext,
  //   // trackMouse:true
  // })
  // ? fin swiper

  const showedCard = database[cardId]

  const cardClass = classNames({
    card: true,
    card__recto: isRecto,
    card__verso: !isRecto
  })

  return <>
{isRecto
  ? <motion.div
  // {...handlers}
    className={cardClass}
    onClick={handleClickReturn}
    >
    <pre className="card__content">
      <MDEditor.Markdown source={myCard.recto} />
    </pre>
  </motion.div>
  : <motion.div
  // {...handlers}
  animate={{ rotateY: 180 }}
  className={cardClass} onClick={handleClickReturn}>
    <motion.pre
    className="card__content"
    animate={{ rotateY: 180 }}>
      <MDEditor.Markdown source={myCard.verso} />
    </motion.pre>
  </motion.div>
}
  {!hideButtons && <><Next delayedCardsLength={delayedCardsLength} initialLength={initialLength.current} failedCards={failedCards} database={database} showedCard={showedCard} nextCard={nextCard} setNextCard={setNextCard} deckId={deckId} cardsNumberInDeck={cardsNumberInDeck} addFailedCards={addFailedCards}/>
  <p style={{ fontSize: '1.5em' }}> Cartes restantes: {cardsNumberInDeck - 1}</p></>}
  </>
}
export default ShowCards
