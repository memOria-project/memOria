import MDEditor from "@uiw/react-md-editor"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form.js'
import './CardEditor.scss'
import { EDIT_CARD, FETCH_CARDS, getCurrentDeckContent, POST_CARD } from "../../actions/index.js";
import Confirmation from "./Confirmation.js";
const CardEditor = ()=>{
    let {deckId, cardId} = useParams()
    deckId = parseInt(deckId, 10)
    cardId = parseInt(cardId, 10)

    const isModified = useSelector((state) => state.currentDeck.isModified)
    const [preview, setPreview] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const dispatch = useDispatch()

    useEffect( () => {
      if(isModified){
        setIsSuccess(true)
      }
      else{
        setIsSuccess(false)
      }
      }, [isModified])


    dispatch({type:EDIT_CARD, field:[{"field":"currentDeckId",
        "value": deckId}, {"field":"currentCardId", "value":cardId}]})

    const handleClick = (event) => {
        event.preventDefault()
        setPreview((state)=> !state);
      }
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({type:POST_CARD, cardId})
        setIsSubmit(true)
    }

return (
    <div>
        {isSubmit?
          <Confirmation isSuccess={isSuccess} deckId={deckId} />
          :console.log("première soumission")
        }
        <h1 className="title"> Créer /editer une carte </h1>
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