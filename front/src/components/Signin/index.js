import { useDispatch } from 'react-redux'
import { LOG_IN } from '../../actions';
const SignIn = ()=>{
    const name="toto";
    const password = "123456";
const dispatch = useDispatch();

const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({type:LOG_IN});
}

return (
    <form onSubmit={handleSubmit}>
        <input type="login" defaultValue={name} />
        <input type="password" defaultValue={password} />
        <button type="submit">submit</button>
    </form>
    )
}
export default SignIn