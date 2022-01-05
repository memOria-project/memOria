import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SET_ERROR, SUBSCRIBE, UPDATE_PROFILE } from '../../actions'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import monimage from '../../assets/javascript.jpg'
import classNames from 'classnames'
import Error from '../ErrorMessage'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const UpdateForm = ({ setShowUpdateForm }) => {
  const { name, email, error } = useSelector((state) => state.user)
  const { isSuccessful } = useSelector((state) => state.back)

  const schema = yup.object().shape({
    name: yup.string().min(4, 'Au moins 4 caractères').max(15, 'Moins de 15 caractères').required(),
    email: yup.string().email('Email non valide').required(),
    password: yup.lazy((value) => {
      if (value === '') return yup.string().notRequired()
      else return yup.string().min(8, 'Au moins 8 caractères').max(20, 'Pas plus de 20 caractères').matches(/(?=.*[!?@#$%^&-+=()])/, 'Veuillez inclure au moins un caractère spécial(!?@#$%&*()-+=^)')
    }),
    confirmPassword: yup.lazy((value, options) => {
      if (options.parent.password) return yup.string().oneOf([options.parent.password], 'ne correspond pas')
      else return yup.string().notRequired()
    }),
    oldpassword: yup.string().required()
  })
  // string().default(undefined).matches(/(?=.*[!?@#$%^&-+=()])/, 'Veuillez inclure au moins un caractère spécial(!?@#$%&*()-+=^)').notRequired()

  const { register, handleSubmit, watch, getValues, formState: { errors, isValid, isSubmitted, isSubmitSuccessful } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) })
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const redirect = () => {
    if (isSubmitted) {
      setLoading(true)
      console.log('is Submitted')
      return <span>argh</span>
    } else if (isSuccessful) {
      setLoading(false)
      return <Redirect to="/profile" />
    }
  }
  const submitButton = classNames({
    valid: isValid,
    notValid: !isValid
  })

  const loginButton = classNames({
    information: true,
    valid: !isValid,
    notValid: isValid
  })

  // reset du message d'erreur
  useEffect(() => {
    dispatch({ type: SET_ERROR, message: false })
  }, [])

  useEffect(() => {
    if (error) {
      setLoading(false)
    }
  }, [error])

  useEffect(() => {
    // reset du message d'erreur
    dispatch({ type: SET_ERROR, message: false })
    redirect()
  }, [isSubmitted, isSuccessful])

  return (loading
    ? <Loading />
    : <div>
          {error && <Error message={error} />}

      <form className='userForm' onSubmit = {handleSubmit((data) => {
        dispatch({ type: UPDATE_PROFILE, data })
      })}>

    <div className= 'form__signUp-container'>
      <div className= 'form__image-section imageSection'>
        <img src={monimage} alt="books on coding" />
      </div>

      <div className= 'form__profil-section formSection'>
        <h1 className="infoPersoTitle">Créer un compte</h1>

        <div className= 'form__info-profil infoPersoLeft'>
          <div className= 'form__username inputRow'>
              <label className='form__label inputName '> Nom d'utilisateur </label>
              <input type="text" id="username" name="username"
                {...register('name')}
                defaultValue={name}
              />

              <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="name" />
        </div>

          <div className= 'form__email inputRow'>
            <label className='form__label inputName'> Email </label>
              <input type="email" id="email" name="email"
                {...register('email')}
                defaultValue={email}

              />

            <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="email" />
          </div>

          <div className= 'form__password inputRow'>
            <label className='form__label inputName'> Mot de passe </label>
              <input type="password" id="password" name="password"
                {...register('password')
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
                {...register('confirmPassword')}
                />

            <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="confirmPassword" />
          </div>

          <label className='form__label inputName'> <strong> Veuillez indiquer le Mot de passe actuel</strong>
            <input type="password" id="oldpassword" name="oldpassword" {...register('oldpassword')}/>
          </label>

          <div className= 'login-button'>
                <button onClick={() => setShowUpdateForm(false)}>retour</button>
                <button type="submit" className={submitButton} disabled={!isValid}>Mettre à jour</button>
          </div>

        </div>
      </div>
    </div>

  </form>

      </div>)
}
export default UpdateForm
