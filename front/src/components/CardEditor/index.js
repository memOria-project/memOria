import MDEditor from "@uiw/react-md-editor"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form.js'
import { GET_CARD, FETCH_CARDS, getCurrentDeckContent, POST_CARD } from "../../actions/index.js";
import Confirmation from "./Confirmation.js";
import './CardEditor.scss'
import './CardEditor_Desktop.scss'

const CardEditor = ()=>{
    let {deckId, cardId} = useParams()
    deckId = parseInt(deckId, 10)
    cardId = parseInt(cardId, 10)

    const isModified = useSelector((state) => state.currentDeck.isModified)
    const [preview, setPreview] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSuccess, setIsSuccess] = useState() 
    const dispatch = useDispatch()

    useEffect( () => {
      if(isModified.state){
        setIsSubmit(false)

        // setTimeout(()=> {setIsSubmit(false)}
        // ,1000);
        setTimeout(()=> {
          setIsSubmit(true)
          setIsSuccess(true)
        }
        ,100);
      }
      else{
        setIsSuccess(false)
      }
      }, [isModified.count])


    dispatch({type:GET_CARD, field:[{"field":"currentDeckId",
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

        <h1 className="cardEditor__title"> {cardId?"Editer":"Créer"} une carte </h1>
        {isSubmit&&isSuccess!="init"?
          <Confirmation isSuccess={isSuccess} deckId={deckId} />
          :console.log("première soumission")
        }
        <form id="recto" onSubmit={handleSubmit}> 
          <div className="cardEditor__forms">
            <label> 
            <Form isRecto={true} preview={preview}/>
            </label>
            <label> 
            <Form isRecto={false} preview={preview}/>
            </label>
          </div>
          <button className="information" onClick={handleClick}> {preview?"Retour éditeur":"Aperçu"}</button> 
          <button type="submit" className="confirm">Créer</button>
        </form>
    </div>
    )

}
export default CardEditor