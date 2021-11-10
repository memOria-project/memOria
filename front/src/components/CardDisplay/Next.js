import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FETCH_CARDS, RESET_CARD, PICK_NEW_GAME, DELAY_CARD } from '../../actions'
import { useRef, useState, useEffect } from 'react'
const Next = ({ deckId, deckLength, currentCard, setCurrentCard, addFailedCards, count, setCount }) => {
  const dispatch = useDispatch()
  const { defaultView, currentView, isFailed } = useSelector((state) => state.options)
  const { isDelayedReviewOn } = useSelector((state) => state.options)
  const { isConnected } = useSelector((state) => state.user)
  const { cardId } = useParams()
  const setNextCardURL = () => {
    return `/deck/${deckId}/`

    // if (currentCard) {
    //   return `/deck/${deckId}/${currentCard.id}`
    // } else {
    //   return '/'
    // }
  }
  const nextCardURL = `/deck/${deckId}/${currentCard.id}`
  // useEffect(() => {
  //   nextCardURL = setNextCardURL()
  //   console.log(nextCardURL)
  //   console.log(currentCard)
  // }, [currentCard])
  // const deckLength = useSelector(state => state.currentDeck).deck_length
  // const goodCards = deckLength- failedCards.length
  // console.log(goodCards)

  const setIndexNextCard = () => {
    setCurrentCard(prevState => ({ ...prevState, index: prevState.index + 1 }))
  }

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

    setIndexNextCard()

    setCount(prevState => ({ ...prevState, success: prevState.success + 1 }))
  }

  const handleClickFail = () => {
    dispatch({ type: RESET_CARD, isRecto: defaultView.isRecto })

    addFailedCards(currentCard)
    setCount(prevState => ({ ...prevState, failed: prevState.failed + 1 }))
    setIndexNextCard()
  }

  return (
  <div>
    {deckLength > 0 &&
      (<>
        <button className="confirm" onClick={() => handleClickSuccess()}>
          <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faCalendarCheck}/> {count.success}</NavLink>
        </button>
          <button className="warning" onClick={() => handleClickFail()}>
            <NavLink to={nextCardURL} > <FontAwesomeIcon icon={faTimesCircle} /> {count.failed}</NavLink>
          </button>

      </>)
 }
  </div>
  )
}
export default Next
