import { useState } from 'react'
import RectoVerso from '../RectoVerso'

const Options = ({setShowOptions}) => {
  let className = "btn__options"
  let classNameActive = "btn__options--active"

  const [isActive, setIsActive] = useState({allCards: false, onlyFailed:false})
  const handleClick = (event) => {
    if (event.target.id === "start") {
      setShowOptions((state)=> !state)
    }
    setIsActive((state)=>({...state, allCards: false, onlyFailed: false }))
    setIsActive((state) => ({...state, [event.target.id]:true}))
  }
  
  return (
    <div style={{margin:"2em"}}>
      <h1> Options</h1>

      <h2>Montrer en premier </h2>
        <RectoVerso />
      <h2>  Parcourir les cartes</h2>
        <button id="allCards" onClick={handleClick} className={isActive.allCards?classNameActive:className}>apprises et non apprises</button>
        <button id="onlyFailed" className={isActive.onlyFailed?classNameActive:className} onClick={handleClick}> non apprises</button> <br /> <br />
        <button className="btn__submit" onClick={handleClick} id="start" type="submit">Commencer</button>
     </div>
  )
}
export default Options