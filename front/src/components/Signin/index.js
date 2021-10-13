import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN, UPDATE_LOGIN } from '../../actions'
import { Redirect } from 'react-router-dom'
import { useState } from 'react';
import Loading from '../Loading';
import '../Subscribe/subscribe.scss'
import monimage2 from '../../assets/javascript.jpg'

const SignIn = ()=>{
    const {password, email, isConnected} = useSelector((state)=> (state.user));
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading((state)=> !state)
        dispatch({type:LOG_IN});
    }

    const handleChange = (event, field) => {
        dispatch({
            type:UPDATE_LOGIN,
            value: event.target.value,
            field })
    }

return (<div> 
    {isConnected?
    <Redirect from="/signin" to="/profile" /> 
    :isLoading?
      <Loading />
      :
      (<form className='form' onSubmit={handleSubmit}>
        <div className= 'form__signIn-container'>
          <div className= 'form__image-section imageSection'>
            <img src={monimage2} alt="code expressjs" />
          </div>

          <div className= 'form__profil-section formSection'>
            <h2 class="infoPersoTitle">Connexion</h2>

            <div className='form__info-profil infoPersoLeft'>
              <div className='form__email inputRow'>
                  <label className='form__label inputName'> Email </label>
                  <input id="login" onChange={(event)=> handleChange(event, "email")} id="email" type="email" value={email}/>
              </div>

              <div className='form__password inputRow'>
                <label className='form__label inputName'> Mot de passe </label>
                <input onChange={(event)=> handleChange(event, "password")} id="password" type="password" value={password} />
              </div>

              <button type="submit">Se Connecter</button>
            </div>

          </div>
      </div> 

      </form>) }
    </div>
)
}
export default SignIn
