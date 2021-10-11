import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { EDIT_OPTIONS } from '../../actions'
import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'


const Options = ({setShowOptions, delayedCards}) => {
  const isConnected = useSelector((state) => state.user.isConnected)
  const {isDelayedReviewOn} = useSelector((state) => state.card)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState({allCards: true, onlyFailed:false})

  const handleClick = (event) => {
    if (event.target.id === "start") {
      setShowOptions((state)=> !state)
    }
    else if (event.target.id === "allCards") {
      dispatch({type:EDIT_OPTIONS, field: "isDelayedReviewOn", value: false})
    }
    else if (event.target.id === "onlyFailed") {
      dispatch({type:EDIT_OPTIONS, field: "isDelayedReviewOn", value: true})
    }

    setIsActive((state)=>({...state, allCards: false, onlyFailed: false }))
    setIsActive((state) => ({...state, [event.target.id]:true}))
  }

  return (
    <div style={{margin:"2em"}}>
      <h1> Options
        {/* <button onClick={()=>setShowOptions(false)}>cacher</button> <br /> */}
      </h1>

      <h2>Montrer en premier </h2>
        <RectoVerso />
      {isConnected&&
        <>
          <h2>  Parcourir les cartes</h2>
          <DelayedCards onClick={handleClick} isActive={isActive} delayedCards={delayedCards} />
        </>
        }
        <button className="btn__submit" id="start" type="submit" onClick={handleClick}>Continuer </button>
        {/* <FontAwesomeIcon icon={faCheck} onClick={handleClick}/> */}
     </div>
  )
}
export default Options