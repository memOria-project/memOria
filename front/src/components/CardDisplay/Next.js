import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCalendarCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FETCH_CARDS, RESET_CARD, PICK_NEW_GAME, DELAY_CARD } from '../../actions'
import { useRef, useState, useEffect } from 'react'
import setResponseStatus from './setResponseStatus'
import setIndexPreviousCard from './setIndexPreviousCard'
import setIndexNextCard from './setIndexNextCard'

const Next = ({ setDatabase, deckId, deckLength, currentCard, setCurrentCard, addFailedCards, count, setCount }) => {
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

  const setDelay = () => {
    dispatch({ type: DELAY_CARD, id: currentCard.id })
  }
  const handleClickSuccess = () => {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })

    if (isConnected) {
      setDelay()
      console.log(`handleClickSuccess:
      ${cardId} has been delayed`)
    }
    setResponseStatus(setDatabase, currentCard.id, true)
    setIndexNextCard()
    switch (currentCard.response) {
      case 'notPicked': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1 }))
        break
      }
      case 'wrong': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
        break
      }
      case 'correct': {
        console.log('card response confirmed')
      }
    }
  }

  const handleClickFail = () => {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })
    switch (currentCard.response) {
      case 'notPicked': {
        addFailedCards(currentCard)
        setCount(prevState => ({ ...prevState, failed: prevState.failed + 1 }))
        break
      }
      case 'wrong': {
        setCount(prevState => ({ ...prevState, success: prevState.success + 1, failed: prevState.failed - 1 }))
        break
      }
      case 'correct': {
        setCount(prevState => ({ ...prevState, failed: prevState.failed + 1, success: prevState.success - 1 }))
      }
    }
    setResponseStatus(setDatabase, currentCard.id, false)
    setIndexNextCard()
  }
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
        <button className="discrete" onClick={() => setIndexPreviousCard(setCurrentCard, currentCard.index)} style={{ visibility: isFirstCard ? 'hidden' : 'visible' }}>
&#11164;</button>
        <button className={setActiveClass('confirm', 'correct', currentCard.response)} onClick={() => handleClickSuccess()}>
          <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faCheckCircle}/> {count.success}</NavLink>
        </button>
          <button className={setActiveClass('warning', 'wrong', currentCard.response)} onClick={() => handleClickFail()}>
            <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faTimesCircle} /> {count.failed}</NavLink>
          </button>
          <button className="discrete" onClick={() => setIndexNextCard(setCurrentCard, currentCard.index)}>&#10148; </button>

      </div>)
 }
  </div>
  )
}
export default Next
