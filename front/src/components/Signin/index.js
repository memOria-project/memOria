import { useSelector } from 'react-redux'

const SignIn = ()=>{
    const name="toto";
    const password = "123456";

const handleSubmit = () => {
}

return (
    <form>
        <input type="login" defaultValue={name} />
        <input type="password" defaultValue={password} />
        <button type="submit" onSubmit={handleSubmit}>submit</button>
    </form>
    )
}
export default SignIn