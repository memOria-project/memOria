import MDEditor from "@uiw/react-md-editor"
import { useDispatch, useSelector } from 'react-redux';
import { useState, useParams } from 'react';
import Form from './Form.js'
import './CardEditor.scss'
const CardEditor = ()=>{
    // const { id } = useParams();
    const id = 1;
    const [preview, setPreview] = useState(false)

    const handleClick = (event) => {
        event.preventDefault()
        setPreview((state)=> !state);
      }
    const handleSubmit = (event) => {

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