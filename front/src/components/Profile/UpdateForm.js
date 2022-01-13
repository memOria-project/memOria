import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as yup from 'yup'

import { SET_ERROR, UPDATE_PROFILE, SET_LOADING } from '../../actions'

import Loading from '../Loading'
import Error from '../ErrorMessage'

import monimage from '../../assets/javascript.jpg'
import './UpdateForm.scss'

const UpdateForm = ({ setShowUpdateForm }) => {
  //! ↓ STATE ↓

  const { name, email, error, loading } = useSelector((state) => state.user)
  const { isSuccessful } = useSelector((state) => state.back)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  //! ↓ FORMULAIRE ↓
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

  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm({ mode: 'onChange', resolver: yupResolver(schema) })

  //! ↓ AUTRES ↓

  const submitButton = classNames({
    valid: isValid,
    notValid: !isValid
  })

  //! ↓ EFFETS DE BORD ↓
  // reset du message d'erreur
  useEffect(() => {
    dispatch({ type: SET_ERROR, message: false })
  }, [])

  useEffect(() => {
    if (error) {
      dispatch({ type: SET_LOADING, status: false })
    }
  }, [error])

  useEffect(() => {
    // reset du message d'erreur
    dispatch({ type: SET_ERROR, message: false })
  }, [isSubmitted, isSuccessful])

  //! ↓ RETURN ↓

  return (loading
    ? <Loading />
    : <div className="updateForm__modal">
      {error && <Error message={error} />}

      <form className='userForm' onSubmit = {handleSubmit((data) => {
        dispatch({ type: SET_ERROR, message: false })
        dispatch({ type: SET_LOADING, status: true })
        dispatch({ type: UPDATE_PROFILE, data })
      })}>

      <div className= 'form__signUp-container'>
        <div className= 'form__image-section imageSection'>
          <img src={monimage} alt="books on coding" />
        </div>

        <div className= 'form__profil-section formSection'>
          <h1 className="infoPersoTitle">Mettre à jour vos informations personnelles</h1>

          <div className= 'form__info-profil infoPersoLeft'>
            <div className= 'form__username inputRow'>
                <label className='form__label inputName '> Nom </label>
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
          {showPassword
            ? <>
              <button className="buttonLink" onClick={() => setShowPassword((state) => !state)}> retour </button>
              <div className= 'form__password inputRow'>
                <label className='form__label inputName'> Nouveau Mot de passe </label>
                  <input type="password" id="password" name="password"
                    {...register('password')
                    }
                  />

              <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="password" />

              </div>
              <br />
              <div className= 'form__password-confirm inputRow'>
                <label className='form__label inputName'> Confirmez le nouveau mot de passe </label>
                  <input
                    type="password"
                    id="password-confirm"
                    name="password-confirm"
                    {...register('confirmPassword')}
                    />

                <ErrorMessage errors ={errors} render={({ message }) => <span className='label--error'>{message}</span>} name="confirmPassword" />
              </div>
            </>
            : <button className="buttonLink" onClick={() => setShowPassword((state) => !state)}> Modifier le mot de passe?</button>
          }

          <label>
            <strong style={{ color: 'red', fontSize: '20px' }}> Mot de passe actuel</strong>
            <input
              style={{ border: '1px solid red', borderRadius: '10px' }}
              type="password"
              id="oldpassword"
              name="oldpassword"
              {...register('oldpassword')}/>
          </label>

          <div className= 'login-button'>
                <button className="information" onClick={() => setShowUpdateForm(false)}>retour</button>
                <button type="submit" className={submitButton} disabled={!isValid}>Mettre à jour</button>
          </div>

        </div>
      </div>
    </div>

    </form>

  </div>)
}
export default UpdateForm

UpdateForm.propTypes = {
  setShowUpdateForm: PropTypes.func
}
