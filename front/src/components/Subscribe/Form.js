import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SUBSCRIBE, UPDATE_PROFILE } from '../../actions'
import { Link, Redirect } from 'react-router-dom'
import './subscribe.scss'
import { useDispatch, useSelector } from 'react-redux'


const Form = ({isInProfile}) => {
  const {name, email} = useSelector((state)=>state.user)
  const { register, handleSubmit, watch, getValues, formState: { errors, isValid, isSubmitted } } = useForm({ mode: 'onChange'})
  const dispatch = useDispatch();

  if(isSubmitted) {
    return <Redirect to="/profile" />
  }
  return (<form className='userForm' onSubmit = {handleSubmit((data) => {
    if (isInProfile)
      {
    dispatch({ type: UPDATE_PROFILE, data })
      } else {
    dispatch({ type: SUBSCRIBE, data })
      }
    })}>
    <label className='form__label'> Nom d'utilisateur
      <input
        {...register('name',
          {
            required: 'Nom requis',
            minLength: { value: 4, message: '4 caractères minimum! ' },
            maxLength: { value: 15, message: '15 caractères maximum! ' }
          })} 
        defaultValue={name}
          />
    </label>
    <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="name" />

    <br />
    <label className='form__label'> Email
      <input
        {...register('email',
          {
            required: 'Email requis',
            pattern: {
              value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Email non valide'
            }
          })
        }
        defaultValue={email}

          />
    </label>
    <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="email" />

    <br />
    <label className='form__label'> Mot de passe
      <input
        {...register('password',
          {
            required: 'Mot de passe requis',
            maxLength:
              {
                value: 20,
                message: 'Trop long! 8 à 20 caractères uniquement'
              },
            minLength:
              {
                value: 8,
                message: 'Trop court! 8 à 20 caractères uniquement'
              },
            pattern: {
              value: /(?=.*[!?@#$%^&-+=()])/,
              message: 'Veuillez inclure au moins un caractère spécial(!?@#$%&*()-+=^)'
            }

          })
        }
      />
    </label>
    <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="password" />

    <br />
    <label className='form__label'> Confirmez le mot de passe
      <input
        {...register('confirmPassword',
          {
            required: 'Retapez votre mot de passe',
            validate: v => v === getValues('password') || 'Ne correspond pas'
          })
        }
        />
    </label>

    <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="confirmPassword" />
        <br />
    {isInProfile&&
      <label className='form__label'> <strong> Veuillez indiquer le Mot de passe actuel</strong>
      <input
        {...register('oldpassword')
        }
        />
    </label>
    }
    {!isInProfile&&<Link to="/signin"><button>J'ai déjà un compte</button></Link>}
    {isInProfile?<button type="submit" disabled={!isValid}>Mettre à jour</button>
    :
    <button type="submit" disabled={!isValid}>S'inscrire</button>
    }
  </form>)
}
export default Form
