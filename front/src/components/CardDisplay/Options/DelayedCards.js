import classNames from 'classnames'
import { useSelector } from 'react-redux'
import setClassName from './setClassName'

const DelayedCards = ({ handleClick, delayedCards }) => {
  const { databaseSelector } = useSelector((state) => state.options)
  const areThereDelayedCards = delayedCards > 0
  console.log({ delayedCards, areThereDelayedCards })
  const isDelayedReviewOn = databaseSelector === 'NOT_MASTERED' || databaseSelector === 'FAILED_1ST_ROUND'

  return <>
  <button id="allCards" onClick={handleClick} className={setClassName(!isDelayedReviewOn)}>Toutes les cartes</button>
  <button id="NOT_MASTERED" className={setClassName(isDelayedReviewOn)} onClick={handleClick} disabled={!areThereDelayedCards} hidden={!areThereDelayedCards}> Juste les non-maitrisées</button> <br /> <br />
  {/* <button id="allCards" onClick={handleClick} className={isActive.notMastered?classNameActive:className}>Seulement Non Maitrisées</button> */}
  </>
}
export default DelayedCards
