import classNames from 'classnames'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const DelayedCards = ({ handleClick, isActive, delayedCards }) => {
  const { databaseSelector } = useSelector((state) => state.options)
  const areThereDelayedCards = delayedCards > 0
  console.log({ delayedCards, areThereDelayedCards })
  const isDelayedReviewOn = databaseSelector === 'NOT_MASTERED' || databaseSelector === 'FAILED_1ST_ROUND'
  const className = 'information-alt'
  const classNameActive = 'information'
  const classNameAllCards = classNames({
    [classNameActive]: !isDelayedReviewOn,
    [className]: isDelayedReviewOn
  })

  const classNameNotMastered = classNames({
    [classNameActive]: isDelayedReviewOn,
    [className]: !isDelayedReviewOn
  })

  return <>
  <button id="allCards" onClick={handleClick} className={classNameAllCards}>Toutes les cartes</button>
  <button id="notMastered" className={classNameNotMastered} onClick={handleClick} disabled={!areThereDelayedCards} hidden={!areThereDelayedCards}> Cartes non Maitrisées</button> <br /> <br />
  {/* <button id="allCards" onClick={handleClick} className={isActive.notMastered?classNameActive:className}>Seulement Non Maitrisées</button> */}
  </>
}
export default DelayedCards
