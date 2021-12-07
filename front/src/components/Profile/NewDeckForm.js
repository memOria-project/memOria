import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_DECK } from '../../actions'

const NewDeckForm = ({ handleClick, setShowNewDeck, isEdit }) => {
  const { title, tags, id } = useSelector((state) => state.currentDeck)

  const { register, handleSubmit, watch, getValues, formState: { errors, isValid, isSubmitted, isSubmitSuccessful } } = useForm({ mode: 'onChange', defaultValues: { name: isEdit ? title : '', tags: isEdit ? tags : '', id: isEdit ? id : null } })

  if (isSubmitted) {
    setShowNewDeck(false)
  }
  const dispatch = useDispatch()
  return (
  <div className="modal">
    <div className="modal__container">
      <h1 className="newDeck__title">{isEdit ? 'Editer le paquet' : 'Créer un nouveau paquet'}</h1>
      <form onSubmit={handleSubmit((data) => dispatch({ type: CREATE_DECK, data }))}>
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
         <button className="confirm" name="newDeck" type="submit">{isEdit ? 'Editer' : 'Créer'}</button>
      </form>
      <button name="newDeck" className="information" onClick={handleClick}>retour</button>
    </div>
  </div>
  )
}
export default NewDeckForm
