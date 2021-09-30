import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SUBSCRIBE } from '../../actions'
import { useDispatch } from 'react-redux'

const Subscribe = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors, isDirty, isValid } } = useForm({mode:"onChange"})
  return <div>
  <form onSubmit = {handleSubmit((data) => dispatch({ type: SUBSCRIBE, data }))}>
   
    <label> Nom d'utilisateur
      <input
        {...register('name',
          {
            required: 'Vous devez entrer un nom',
            minLength: { value: 4, message: 'Choisissez un nom dau moins 4 caractères' },
            maxLength: { value: 15, message: 'Choisissez un nom dau maximum 15 caractères' }
          })} />
    </label>
    <ErrorMessage errors={errors} name="name" />

     <br />
    <label> Email <input {...register('email')}/></label> <br />
    <label> Mot de passe <input {...register('password')}/> </label> <br />
    <label> Confirmez le mot de passe <input {...register('confirmPassword', { required: 'Vous devez soumettre un mot de passe'})}/></label> 
    <ErrorMessage errors={errors} name="confirmPassword" /><br />

    <button>J'ai déjà un compte</button>
    <button type="submit" disabled={!isValid}>S'inscrire</button>
  </form>
  {JSON.stringify(watch())}

  </div>
}
export default Subscribe
