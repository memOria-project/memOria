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
  <div className="modal">
    <div className="modal__container">
      <h1 className="newDeck__title">Créer un nouveau paquet</h1>
      <form onSubmit={handleSubmit((data)=> dispatch({type:CREATE_DECK, data}))}>
        <label>Nom du deck
          <input
          {...register('name',
            {
              required: 'Nom requis',
              minLength: { value: 3, message: '4 caractères minimum! ' },
              maxLength: { value: 20, message: '20 caractères maximum! ' }
            })} />
          </label><br />
        <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="name" />
        <label>Tag
          <select name="tags" id="tags" 
                  {...register('tags')}>
              <option value="JS">JS</option>
              <option value="HTML">HTML</option> 
              <option value="CSS">CSS</option>
              <option value="oclock">oClock</option>
          </select>
        </label> <br />
         <button className="confirm" name="newDeck" type="submit">Créer</button>
      </form>
      <button name="newDeck" className="information" onClick={handleClick}>retour</button>
    </div>
  </div>
)
}
export default NewDeckForm