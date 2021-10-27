import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { PICK_DEFAULT_CARD_SIDE } from '../../actions'

const RectoVerso = ()=>{
  const {defaultView, currentView } = useSelector((state)=>state.card);
  const [isActive, setIsActive] = useState({recto: true, verso:false})

  const dispatch = useDispatch();
  const handleClick = (event) => {
    //id = recto button id and verso button id properties
    const userChoice = event.target.id;
    if(userChoice === "recto"){
        dispatch({type:PICK_DEFAULT_CARD_SIDE, isRecto:true})
    }
    else {
        dispatch({type:PICK_DEFAULT_CARD_SIDE, isRecto:false})
    };
    setIsActive((state)=>({...state, recto: false, verso: false }))
    setIsActive((state) => ({...state, [event.target.id]:true}))
}

  let className = "information-alt"
  let classNameActive = "information"



  

return <div style={{visibility:"visible"}}>
    <button id="recto" className={isActive.recto?classNameActive:className} onClick={handleClick} id="recto">Recto</button>
    <button id="verso" className={isActive.verso?classNameActive:className} onClick={handleClick} id="verso">Verso</button>
</div>
}
export default RectoVerso