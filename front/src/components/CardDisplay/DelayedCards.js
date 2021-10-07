import { useState } from "react"
import { useSelector } from "react-redux"

const DelayedCards = ({handleClick, isActive, delayedCards}) => {
  
  const areThereDelayedCards = delayedCards.length>0?true:false

  let className = "btn__options"
  let classNameActive = "btn__options--active"
return <>
  <button id="allCards" onClick={handleClick} className={isActive.allCards?classNameActive:className}>apprises et non apprises</button>
  <button id="onlyFailed" className={isActive.onlyFailed?classNameActive:className} onClick={handleClick} disabled={!areThereDelayedCards}> non apprises</button> <br /> <br />
  </>
}
export default DelayedCards