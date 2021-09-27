import { useDispatch, useSelector } from 'react-redux'
import { LOG_IN, UPDATE_LOGIN } from '../../actions';
const SignIn = ()=>{
    const {password, email, name, isConnected} = useSelector((state)=> (state.user));
    console.log({password, email,name})

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
        console.log({password, email,name})
    }
    console.log(isConnected);

return (<div> 
    {isConnected?
    (<p>Bienvenue, {name} </p>)
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