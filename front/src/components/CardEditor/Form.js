import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CARD } from '../../actions';
import './CardEditor.scss'
const Form = ({isRecto, preview})=>{
    
    const { recto, verso } = useSelector((state)=>state.card.currentCard);
    const dispatch = useDispatch();
    // const value = isRecto?recto:verso


    const handleChange=(val) => {
        const field= isRecto?"recto":"verso";
        console.log(field)
        dispatch({type:EDIT_CARD, field: [{"field": field, "value":val}, {"field":"test", "value":"value"}]})        
    }


return   (<div className="form"> 

        {preview?
            <MDEditor.Markdown source={isRecto?recto:verso} />
            :
            <MDEditor onChange={(val)=>handleChange(val)}  preview='edit' value={isRecto?recto:verso} />
            }
        </div>
    )
}
export default Form