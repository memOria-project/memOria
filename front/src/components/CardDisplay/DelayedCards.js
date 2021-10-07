import { useSelector } from "react-redux"

const DelayedCards = ({handleClick, isActive}) => {
  
  let className = "btn__options"
  let classNameActive = "btn__options--active"
return <>
  <button id="allCards" onClick={handleClick} className={isActive.allCards?classNameActive:className}>apprises et non apprises</button>
  <button id="onlyFailed" className={isActive.onlyFailed?classNameActive:className} onClick={handleClick}> non apprises</button> <br /> <br />
  </>
}
export default DelayedCards