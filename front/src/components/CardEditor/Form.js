import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CARD } from '../../actions';
import './CardEditor.scss'
const Form = ({isRecto, preview})=>{
    
    const { recto, verso } = useSelector((state)=>state.card.currentCard);
    const [value, setValue] = useState(isRecto?recto:verso)
    const dispatch = useDispatch();
    // const value = isRecto?recto:verso


    const handleChange=(val) => {
        const field= isRecto?"recto":"verso";
        console.log(field)
        dispatch({type:EDIT_CARD, field, val})        
    }

return   (<div class="form"> 

        {preview?
            <MDEditor.Markdown source={isRecto?recto:verso} />
            :
            <MDEditor onChange={(val)=>handleChange(val)}  preview='edit' value={isRecto?recto:verso} />
            }
        </div>
    )
}
export default Form