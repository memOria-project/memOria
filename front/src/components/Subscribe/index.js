import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const Subscribe = () => {
  const { register, handleSubmit, watch, formState: { errors, isDirty, isValid } } = useForm()
  
  return <div>
  <form onSubmit = {handleSubmit({type:"SUBSCRIBE"})}>
   
    <label> Nom d'utilisateur 
      <input
        {...register('name',
          {
            required: "Vous devez entrer un nom",
            minLength:{value: 4, message:'Choisissez un nom dau moins 4 caractères'},
            maxLength:{value: 15, message:'Choisissez un nom dau maximum 15 caractères'}
        })} /> </label>
    <ErrorMessage errors={errors} name="name" />

     <br />
    <label> Email <input {...register('email')}/></label> <br />
    <label> Mot de passe <input {...register('password')}/> </label> <br />
    <label> Confirmez le mot de passe <input {...register('confirmPassword', { required: 'Vous devez soumettre un mot de passe'})}/></label> <br />
    <button>J'ai déjà un compte</button>
    <button type="submit">S'inscrire</button>
  </form>
  {JSON.stringify(watch())}

  </div>
}
export default Subscribe
