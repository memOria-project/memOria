import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCheckCircle, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'

import setIndexPreviousCard from './setIndexPreviousCard'
import setIndexNextCard from './setIndexNextCard'
import setAsSuccessful from './setAsSuccessful'
import setDelay from './setDelay'
import setAsFailed from './setAsFailed'
import { RESET_CARD } from '../../actions'

const Next = ({ database, showHotkeys, setDatabase, deckId, deckLength, currentCard, setCurrentCard, failedCards, setFailedCards }) => {
  const dispatch = useDispatch()
  const { defaultView } = useSelector((state) => state.options)
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
        }} style={{ marginRight: '0', visibility: isFirstCard ? 'hidden' : 'visible' }}>
<FontAwesomeIcon icon={faCaretLeft} size="2x" /></button>
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
          <button className="discrete" style={{ marginLeft: '0' }} onClick={() => { setIndexNextCard(setCurrentCard, currentCard.index, deckLength); dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto }) }}>
          <FontAwesomeIcon icon={faCaretRight} size="2x" />
 </button>
      </div>)
 }

  </div>
  )
}
export default Next

Next.propTypes = {
  database: PropTypes.array,
  showHotkeys: PropTypes.bool,
  setDatabase: PropTypes.func,
  deckId: PropTypes.string,
  deckLength: PropTypes.number,
  currentCard: PropTypes.object,
  setCurrentCard: PropTypes.func,
  failedCards: PropTypes.array,
  setFailedCards: PropTypes.func
}
