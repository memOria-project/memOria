import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SUBSCRIBE, UPDATE_PROFILE } from '../../actions'
import { Link, Redirect } from 'react-router-dom'
import './subscribe.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import monimage from '../../assets/javascript.jpg'
import classNames from 'classnames'

const Form = ({isInProfile}) => {
  const {name, email} = useSelector((state)=>state.user)
  const {isSuccessful} = useSelector((state)=>state.back)
  const { register, handleSubmit, watch, getValues, formState: { errors, isValid, isSubmitted, isSubmitSuccessful } } = useForm({ mode: 'onChange'})
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const redirect = () => {
    if(isSubmitted) {
      setLoading(true)
      console.log("is Submitted")
      return <span>argh</span>

    }

    else if(isSuccessful) {
      setLoading(false)
      return <Redirect to="/profile" />

    }
  }
  const submitButton = classNames({
    valid:  isValid,
    notValid: !isValid
  })

  const loginButton = classNames({
    information: true,
    valid:  !isValid,
    notValid: isValid
  })

  useEffect(() => {
    console.log(isSuccessful)
    redirect();
  }, [isSubmitted, isSuccessful])

  return (loading?<Loading />:
  <form className='userForm' onSubmit = {handleSubmit((data) => {
    if (isInProfile)
      {
    dispatch({ type: UPDATE_PROFILE, data })
      } else {
    dispatch({ type: SUBSCRIBE, data })
      }
    })}>

    <div className= 'form__container container'>
      <div className= 'form__image-section imageSection'>
        <img src={monimage} alt="code expressjs" />
      </div>

      <div className= 'form__profil-section formSection'>
        <h2 class="infoPersoTitle">Créer un compte</h2>

        <div className= 'form__info-profil infoPersoLeft'>
          <div className= 'form__username inputRow'>
              <label className='form__label inputName '> Nom d'utilisateur </label>
              <input type="text" id="username" name="username"
                {...register('name',
                  {
                    required: 'Nom requis',
                    minLength: { value: 4, message: '4 caractères minimum! ' },
                    maxLength: { value: 15, message: '15 caractères maximum! ' }
                  })} 
                defaultValue={name}
              />
            
              <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="name" />
        </div>

          <div className= 'form__email inputRow'>
            <label className='form__label inputName'> Email </label>
              <input type="email" id="email" name="email"
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
            
            <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="email" />
          </div>

          <div className= 'form__password inputRow'>
            <label className='form__label inputName'> Mot de passe </label>
              <input type="password" id="password" name="password"
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
            
            <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="password" />
          </div>

          <div className= 'form__password-confirm inputRow'>
            <label className='form__label inputName'> Confirmez le mot de passe </label>
              <input
                type="password"
                id="password-confirm"
                name="password-confirm"
                {...register('confirmPassword',
                  {
                    required: 'Retapez votre mot de passe',
                    validate: v => v === getValues('password') || 'Ne correspond pas'
                  })
                }
                />
            

            <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="confirmPassword" />
          </div>

        

          {isInProfile&&
          <label className='form__label inputName'> <strong> Veuillez indiquer le Mot de passe actuel</strong>
            <input {...register('oldpassword')}/>
          </label>
          }

          <div className= 'login-button'>
              {!isInProfile&&<Link to="/signin"><button className={loginButton}>J'ai déjà un compte</button></Link>}
              {isInProfile?<button type="submit" disabled={!isValid}>Mettre à jour</button>
              :
              <button type="submit" disabled={!isValid} className={submitButton}>S'inscrire</button>
              }
          </div>

        </div> 
      </div>
    </div> 

  </form>)
}
export default Form

