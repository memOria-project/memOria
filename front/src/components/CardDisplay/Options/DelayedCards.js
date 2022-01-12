import { useDispatch, useSelector } from 'react-redux'
import optionSwitch from './optionSwitch'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const DelayedCards = ({ handleClick, delayedCards }) => {
  const { databaseSelector } = useSelector((state) => state.options)
  const areThereDelayedCards = delayedCards > 0
  console.log(delayedCards)
  console.log({ delayedCards, areThereDelayedCards })
  const isDelayedReviewOn = databaseSelector === 'NOT_MASTERED' || databaseSelector === 'FAILED_1ST_ROUND'
  const dispatch = useDispatch()
  const handleClickNext = (event) => {
    if (isDelayedReviewOn) {
      optionSwitch('allCards', dispatch)
    } else {
      optionSwitch('NOT_MASTERED', dispatch)
    }
  }
  const showArrows = areThereDelayedCards ? 'visible' : 'hidden'

  return (
  <div className="deckOptions__buttons">
    <div className="info-div">
      <FontAwesomeIcon icon={faCaretLeft} className="discrete" onClick={handleClickNext} style={{ visibility: showArrows, cursor: 'pointer' }}/>

      <p>{isDelayedReviewOn ? 'Juste les non maitrisées' : 'Toutes les cartes'}</p>

      <FontAwesomeIcon icon={faCaretRight} className="discrete" onClick={handleClickNext} style={{ visibility: showArrows, cursor: 'pointer' }}/>

    </div>
  </div>
  )
}
export default DelayedCards

DelayedCards.propTypes = {
  handleClick: PropTypes.func,
  delayedCards: PropTypes.number
}
