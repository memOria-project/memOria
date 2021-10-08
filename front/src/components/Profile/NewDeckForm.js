import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CREATE_DECK } from '../../actions'

const NewDeckForm = ({ handleClick, setShowNewDeck }) => {
  const { register, handleSubmit, watch, getValues, formState: { errors, isValid, isSubmitted, isSubmitSuccessful } } = useForm({ mode: 'onChange'})
  if(isSubmitted){
    setShowNewDeck(false)
  }
  const dispatch = useDispatch()
return (
  <div className="personalDecks__new--modal">
  <div className="modal__content">
    <h1>Créer un nouveau paquet</h1>
    <form onSubmit={handleSubmit((data)=> dispatch({type:CREATE_DECK, data}))}>
      <label>Nom du deck
        <input
        {...register('name',
          {
            required: 'Nom requis',
            minLength: { value: 3, message: '4 caractères minimum! ' },
            maxLength: { value: 15, message: '15 caractères maximum! ' }
          })} />
      </label><br />
      <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="name" />
      <label>Tag
        <select name="tags" id="tags" 
                {...register('tags')}>
            <option value="JS">JS</option>
            <option value="HTML">HTML</option> 
            <option value="HTML">CSS</option>
        </select>
      </label> <br />
      <button name="newDeck" type="submit">Créer</button>

    </form> <br />
    <button name="newDeck" onClick={handleClick}>retour</button>
    </div>
  </div>
)
}
export default NewDeckForm