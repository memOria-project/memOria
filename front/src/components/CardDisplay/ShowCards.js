import { RETURN_CARD } from '../../actions'
import MDEditor from '@uiw/react-md-editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Next from './Next'
import { motion } from 'framer-motion'
import classNames from 'classnames'
// import { useSwipeable } from 'react-swipeable'

const ShowCards = ({ hideButtons, database, addFailedCards, failedCards, setCurrentCard, currentCard }) => {
  const { deckId } = useParams()
  const dispatch = useDispatch()
  const { currentView } = useSelector((state) => state.options)
  const { isRecto } = currentView
  const deckLength = database.length

  useEffect(() => {
    if (database.length > 1 && currentCard.index <= database.length - 1) {
      setCurrentCard((prevState) => ({ ...prevState, recto: database[prevState.index].recto, verso: database[prevState.index].verso, id: database[prevState.index].id }))
      console.log(currentCard)
    }
  }, [database, currentCard.index])

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
      <MDEditor.Markdown source={currentCard.recto} />
    </pre>
  </motion.div>
  : <motion.div
  // {...handlers}
  animate={{ rotateY: 180 }}
  className={cardClass} onClick={handleClickReturn}>
    <motion.pre
    className="card__content"
    animate={{ rotateY: 180 }}>
      <MDEditor.Markdown source={currentCard.verso} />
    </motion.pre>
  </motion.div>
}
  {!hideButtons && <><Next failedCards={failedCards} database={database} currentCard={currentCard} setCurrentCard={setCurrentCard} deckId={deckId} deckLength={deckLength} addFailedCards={addFailedCards}/>
  <p style={{ fontSize: '1.5em' }}> Cartes restantes: {deckLength - currentCard.index}</p></>}
  </>
}
export default ShowCards
