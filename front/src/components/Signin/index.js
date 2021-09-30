import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN, UPDATE_LOGIN } from '../../actions'
import { Redirect } from 'react-router-dom'

const SignIn = ()=>{
    const {password, email, isConnected} = useSelector((state)=> (state.user));
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
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
    :
    (<form onSubmit={handleSubmit}>
        <label htmlFor="login">Email
            <input id="login" onChange={(event)=> handleChange(event, "email")} value={email}/>
            </label>
        <label htmlFor="password">Mot de passe
            <input onChange={(event)=> handleChange(event, "password")} id="password" type="password" value={password} />
        </label>
        <button type="submit">submit</button>
    </form>)
    
    }
    </div>)
}
export default SignIn