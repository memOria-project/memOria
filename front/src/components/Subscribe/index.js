import { useForm } from 'react-hook-form'

const Subscribe = ()=>{
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

return <form onSubmit = {handleSubmit}>
  <label> Nom d'utilisateur <input {...register('name')} /> </label> <br />
  <label> Email <input {...register('email')}/></label> <br />
  <label> Mot de passe <input {...register('password')}/> </label> <br />
  <label> Confirmez le mot de passe <input {...register('confirmPassword')}/></label> <br />
  <button>J'ai déjà un compte</button>
  <button type="submit">S'inscrire</button>
</form>
}
export default Subscribe