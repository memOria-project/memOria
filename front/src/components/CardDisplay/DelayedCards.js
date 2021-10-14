import { useState } from "react"
import { useSelector } from "react-redux"

const DelayedCards = ({handleClick, isActive, delayedCards}) => {
  const areThereDelayedCards = delayedCards.length>0?true:false

  let className = "information-alt"
  let classNameActive = "information"

return <>
  <button id="allCards" onClick={handleClick} className={isActive.allCards?classNameActive:className}>Toutes les cartes</button>
  <button id="onlyFailed" className={isActive.onlyFailed?classNameActive:className} onClick={handleClick} disabled={!areThereDelayedCards} hidden={!areThereDelayedCards}> Cartes non Maitrisées</button> <br /> <br />
  {/* <button id="allCards" onClick={handleClick} className={isActive.onlyFailed?classNameActive:className}>Seulement Non Maitrisées</button> */}
  </>
}
export default DelayedCards