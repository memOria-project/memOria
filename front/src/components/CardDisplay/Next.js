import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCalendarCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FETCH_CARDS, RESET_CARD, PICK_NEW_GAME, DELAY_CARD } from '../../actions'
import { useRef, useState, useEffect } from 'react'
import setResponseStatus from './setResponseStatus'
import setIndexPreviousCard from './setIndexPreviousCard'
import setIndexNextCard from './setIndexNextCard'
import setAsSuccessful from './setAsSuccessful'
import setDelay from './setDelay'
import setAsFailed from './setAsFailed'
import { AnimatePresence, motion } from 'framer-motion'

const Next = ({ database, showHotkeys, setDatabase, deckId, deckLength, currentCard, setCurrentCard, failedCards, setFailedCards }) => {
  const dispatch = useDispatch()
  const { defaultView } = useSelector((state) => state.options)
  const { isConnected } = useSelector((state) => state.user)
  const { cardId } = useParams()
  const [isFirstCard, setIsFirstCard] = useState()

  const nextCardURL = `/deck/${deckId}/${currentCard.id}`
  useEffect(() => {
    if (currentCard.index === 0) {
      setIsFirstCard(true)
    } else {
      setIsFirstCard(false)
    }
  }, [currentCard.index])

  const setActiveClass = (defaultClass, buttonType, cardStatus) => {
    switch (cardStatus) {
      case buttonType: {
        return `${defaultClass} scaleDown`
      }
      default: {
        return `${defaultClass}`
      }
    }
  }

  const numberOfSuccess = database.filter((card) => card.response === 'correct').length
  const numberOfWrong = database.filter((card) => card.response === 'wrong').length

  return (
  <div>
    {deckLength > 0 &&
      (<div className="cardDisplay__nextButtons">
        <button className="discrete" onClick={() => {
          setIndexPreviousCard(setCurrentCard, currentCard.index); dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
        }} style={{ visibility: isFirstCard ? 'hidden' : 'visible' }}>
&#11164;</button>
        <button className={setActiveClass('confirm', 'correct', currentCard.response)} onClick={() => setAsSuccessful(setDelay, setDatabase, currentCard, setCurrentCard, deckLength, failedCards, setFailedCards, dispatch)}>

          <NavLink to={nextCardURL} >
          <AnimatePresence>

            {showHotkeys
              ? <motion.span
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.5 }, position: 'absolute' }}
              className="keyUp">&#11165;
              </motion.span>
              : <motion.span
              animate={{ opacity: [0, 1] }}
              initial={false}
              transition={{ delay: 1.5 }}
              >
                <FontAwesomeIcon
                // key={2}
              icon={faCheckCircle}/>
              </motion.span>
            }
                        </AnimatePresence>
          <span style={{ paddingLeft: '5px' }}>
            {numberOfSuccess}
          </span>

          </NavLink>

        </button>
          <button className={setActiveClass('warning', 'wrong', currentCard.response)} onClick={() => setAsFailed(failedCards, setFailedCards, currentCard, setDatabase, setCurrentCard, deckLength, dispatch)}>
            <NavLink to={nextCardURL} >
            <AnimatePresence>
            {showHotkeys
              ? <motion.span
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 1.5 }, position: 'absolute' }}
              className="keyUp">&#11167;
              </motion.span>
              : <motion.span
              animate={{ opacity: [0, 1] }}
              initial={false}
              transition={{ delay: 1.5 }}
              >
                <FontAwesomeIcon
                key={2}
                icon={faTimesCircle}
                />
              </motion.span>
              }
              </AnimatePresence>
               <span style={{ paddingLeft: '5px' }}>{numberOfWrong}</span>
              </NavLink>
          </button>
          <button className="discrete" onClick={() => { setIndexNextCard(setCurrentCard, currentCard.index, deckLength); dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto }) }}>
            &#10148; </button>
      </div>)
 }

  </div>
  )
}
export default Next
