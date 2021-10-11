import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN, UPDATE_LOGIN } from '../../actions'
import { Redirect } from 'react-router-dom'
import { useState } from 'react';
import Loading from '../Loading';

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
      (<form onSubmit={handleSubmit}>
          <div className= 'form__email inputRow'>
            <label htmlFor="login" className='form__label inputName'> Email </label>
            <input id="login" onChange={(event)=> handleChange(event, "email")} value={email}/>
          </div>

          <div className= 'form__password inputRow'>
            <label htmlFor="password" className='form__label inputName'> Mot de passe </label>
            <input onChange={(event)=> handleChange(event, "password")} id="password" type="password" value={password} />
            
            <button type="submit">submit</button>
          </div>
      </form>) }   
    </div>)
}
export default SignIn
