import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN, SET_ERROR, UPDATE_LOGIN } from '../../actions'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import '../Subscribe/subscribe.scss'
import monimage2 from '../../assets/javascript.jpg'

const SignIn = () => {
  const { password, email, isConnected, error } = useSelector((state) => (state.user))
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading((state) => !state)
    dispatch({ type: SET_ERROR, message: false })
    dispatch({ type: LOG_IN })
  }

  const handleChange = (event, field) => {
    dispatch({
      type: UPDATE_LOGIN,
      value: event.target.value,
      field
    })
  }
  // reset du message d'erreur au montage
  useEffect(() => {
    dispatch({ type: SET_ERROR, message: false })
  }, [])

  // suppression du spinner pour afficher l'erreur et le formulaire
  useEffect(() => {
    if (error) {
      setIsLoading(false)
    }
  }, [error])
  return (<div>
    {isConnected
      ? <Redirect from="/signin" to="/profile" />
      : isLoading
        ? <Loading />
        : (<form className='formSignin' onSubmit={handleSubmit}>
        <div className= 'form__signIn-container'>
          <div className= 'form__image-section imageSection'>
            <img src={monimage2} alt="book on coding" />
          </div>

          <div className= 'form__profil-section formSection'>
            <h1 className="infoPersoTitle">Connexion</h1>

            <div className='form__info-profil infoPersoLeft'>
              <div className='form__email inputRow'>
                  <label className='form__label inputName'> Email </label>
                  <input onChange={(event) => handleChange(event, 'email')} id="email" type="email" value={email}/>
              </div>

              <div className='form__password inputRow'>
                <label className='form__label inputName'> Mot de passe </label>
                <input onChange={(event) => handleChange(event, 'password')} id="password" type="password" value={password} />
              </div>

              <button className="btn__submit" type="submit">Se Connecter</button>
            </div>
          </div>
      </div>

      </form>) }
      {error && <ErrorMessage message={error} />}

    </div>
  )
}
export default SignIn
