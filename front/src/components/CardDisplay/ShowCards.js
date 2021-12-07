import { RETURN_CARD } from '../../actions'
import MDEditor from '@uiw/react-md-editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { useSwipeable } from 'react-swipeable'
import setAsSuccessful from './setAsSuccessful'
import setAsFailed from './setAsFailed'
import setDelay from './setDelay'

const ShowCards = ({ hideButtons, showHotkeys, setDatabase, database, failedCards, setFailedCards, setCurrentCard, currentCard }) => {
  const { deckId } = useParams()
  const dispatch = useDispatch()
  const { currentView } = useSelector((state) => state.options)
  const { isRecto } = currentView
  useEffect(() => {
    if (database.length >= 1 && !hideButtons) {
      setCurrentCard((prevState) => ({ ...prevState, recto: database[prevState.index].recto, verso: database[prevState.index].verso, id: database[prevState.index].id, response: database[prevState.index].response }))
      console.log({ currentCard })
    }
  }, [database, currentCard.index])

  const handleClickReturn = () => {
    dispatch({ type: RETURN_CARD, isRecto: currentView.isRecto })
  }

  // ? swiper. Il faut aussi activer ...handlers dans les divs, et import handleClickFail/handleClickNext
  const handlers = useSwipeable({
    onSwipedDown: (event) => setAsFailed(failedCards, setFailedCards, currentCard, setDatabase, setCurrentCard, database.length, dispatch),
    onSwipedUp: (event) => setAsSuccessful(setDelay, setDatabase, currentCard, setCurrentCard, database.length, failedCards, setFailedCards, dispatch),
    trackMouse: true
  })
  // ? fin swiper

  const cardClass = classNames({
    card: true,
    card__recto: isRecto,
    card__verso: !isRecto
  })

  return <>
{isRecto
  ? <motion.div
  {...handlers}
    className={cardClass}
    onClick={handleClickReturn}
    >
    <pre className="card__content">
      <MDEditor.Markdown source={currentCard.recto} />
    </pre>
  </motion.div>
  : <motion.div
  {...handlers}
  animate={{ rotateY: 180 }}
  className={cardClass} onClick={handleClickReturn}>
    <motion.pre
    className="card__content"
    animate={{ rotateY: 180 }}>
      <MDEditor.Markdown source={currentCard.verso} />
    </motion.pre>
  </motion.div>
}
  {!hideButtons && <><Next database={database} showHotkeys={showHotkeys} setFailedCards={setFailedCards} setDatabase={setDatabase} failedCards={failedCards} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckId} deckLength={database.length} />
  <p style={{ fontSize: '1.5em' }}> Cartes restantes: {database.length - currentCard.index - 1}</p></>}
  </>
}
export default ShowCards
