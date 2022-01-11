import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import optionSwitch from './optionSwitch'
import setClassName from './setClassName'

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
      <button className="discrete" onClick={handleClickNext} style={{ visibility: showArrows }}>
      &#x2B9C;
      </button>

      {isDelayedReviewOn ? 'Juste les non maitrisées' : 'Toutes les cartes'}

      <button className="discrete" onClick={handleClickNext} style={{ visibility: showArrows }}>
        &#10148;
      </button>
    </div>
  </div>
  )
}
export default DelayedCards
