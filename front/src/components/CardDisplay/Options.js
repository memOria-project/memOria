import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EDIT_OPTIONS } from '../../actions'
import RectoVerso from '../RectoVerso'
import DelayedCards from './DelayedCards'

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
      <h1> Options</h1>

      <h2>Montrer en premier </h2>
        <RectoVerso />
      {isConnected&&
        <>
          <h2>  Parcourir les cartes</h2>
          <DelayedCards handleClick={handleClick} isActive={isActive} delayedCards={delayedCards} />
        </>
        }
        <button className="btn__submit" onClick={handleClick} id="start" type="submit">Commencer</button>

     </div>
  )
}
export default Options