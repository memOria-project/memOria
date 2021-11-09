import { useState } from 'react'
import { useSelector } from 'react-redux'

const DelayedCards = ({ handleClick, isActive, delayedCards }) => {
  const areThereDelayedCards = delayedCards.length > 0

  const className = 'information-alt'
  const classNameActive = 'information'

  return <>
  <button id="allCards" onClick={handleClick} className={isActive.allCards ? classNameActive : className}>Toutes les cartes</button>
  <button id="notMastered" className={isActive.notMastered ? classNameActive : className} onClick={handleClick} disabled={!areThereDelayedCards} hidden={!areThereDelayedCards}> Cartes non Maitrisées</button> <br /> <br />
  {/* <button id="allCards" onClick={handleClick} className={isActive.notMastered?classNameActive:className}>Seulement Non Maitrisées</button> */}
  </>
}
export default DelayedCards
