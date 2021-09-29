import MDEditor from "@uiw/react-md-editor"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form.js'
import './CardEditor.scss'
import { EDIT_CARD, POST_CARD } from "../../actions/index.js";
const CardEditor = ()=>{
    let {deckId, cardId} = useParams();
    deckId = parseInt(deckId, 10);
    cardId = parseInt(cardId, 10);
    const [preview, setPreview] = useState(false)
    const dispatch = useDispatch()
    dispatch({type:EDIT_CARD, field:[{"field":"currentDeckId",
        "value": deckId}, {"field":"currentCardId", "value":cardId}]})

    const handleClick = (event) => {
        event.preventDefault()
        setPreview((state)=> !state);
      }
    const handleSubmit = (event) => {
        dispatch({type:POST_CARD})
    }

return (
    <div> 
        <h1 class="title"> Créer /editer une carte </h1>
        <form id="recto" onSubmit={handleSubmit}> 
            <label> Recto  
            <Form isRecto={true} preview={preview}/>
            </label>
            <label> Verso 
            <Form isRecto={false} preview={preview}/>
            </label>
            <button onClick={handleClick}> Preview</button> 
            <button type="submit">Submit</button>
        </form>
    </div>
    )

}
export default CardEditor