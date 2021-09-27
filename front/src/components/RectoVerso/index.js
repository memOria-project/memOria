import { useSelector, useDispatch } from 'react-redux'
import { PICK_ORDER } from '../../actions'

const RectoVerso = ()=>{
    const {defaultView, currentView } = useSelector((state)=>state.card);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        const userChoice = event.target.id;
        if(userChoice === "recto"){
            dispatch({type:PICK_ORDER, isRecto:true})
        }
        else {
            dispatch({type:PICK_ORDER, isRecto:false})

        }
    }
return <div style={{visibility:"visible"}}>
    <button onClick={handleClick} id="recto">Recto</button>
    <button onClick={handleClick} id="verso">Verso</button>

</div>
}
export default RectoVerso