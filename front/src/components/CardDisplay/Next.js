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

const Next = ({ setDatabase, deckId, deckLength, currentCard, setCurrentCard, count, setCount, setFailedCards }) => {
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

  return (
  <div>
    {deckLength > 0 &&
      (<div className="cardDisplay__nextButtons">
        <button className="discrete" onClick={() => {
          setIndexPreviousCard(setCurrentCard, currentCard.index); dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
        }} style={{ visibility: isFirstCard ? 'hidden' : 'visible' }}>
&#11164;</button>
        <button className={setActiveClass('confirm', 'correct', currentCard.response)} onClick={() => setAsSuccessful(setDelay, setDatabase, currentCard, setCurrentCard, setCount, dispatch)}>
          <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faCheckCircle}/> {count.success}</NavLink>
        </button>
          <button className={setActiveClass('warning', 'wrong', currentCard.response)} onClick={() => setAsFailed(setFailedCards, setCount, currentCard, setDatabase, setCurrentCard, dispatch)}>
            <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faTimesCircle} /> {count.failed}</NavLink>
          </button>
          <button className="discrete" onClick={() => { setIndexNextCard(setCurrentCard, currentCard.index); dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto }) }}>&#10148; </button>

      </div>)
 }
  </div>
  )
}
export default Next
