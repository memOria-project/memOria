import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CardEditor.scss'
const Form = ({isRecto, preview})=>{
    
    const { recto, verso } = useSelector((state)=>state.card.currentCard);
    const [value, setValue] = useState(isRecto?recto:verso)

    // const value = isRecto?recto:verso
    


    const handleChange=(event) => {
        console.log(event);
    }

return   (<div class="form"> 

        {preview?
            <MDEditor.Markdown source={value} />
            :
            <MDEditor onChange={setValue}  preview='edit' value={value} />
            }
        </div>
    )
}
export default Form