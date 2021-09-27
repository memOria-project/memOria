import { useSelector } from 'react-redux'

const Profile = ()=>{
    const {name, decks, email} = useSelector((state)=> state.user);

return <div> <h2>Bienvenue {name}</h2></div>
}
export default Profile