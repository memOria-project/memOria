import { useSelector } from 'react-redux'
import Deck from '../Deck';
import './Profile.scss';



const Profile = ()=>{
    
const {name, email} = useSelector((state)=> state.user);

const personalizedDecks = useSelector((state)=>(state.user.decks))
console.log(personalizedDecks);


// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch({type:CHANGE_PASSWORD});
// }

// const handleChange = (event, field) => {
//   dispatch({
//       type:UPDATE_LOGIN,
//       value: event.target.value,
//       field })
// }



return (<>
        <div> 
          <h2>Bienvenue {name}</h2>
        </div>

        {/* Personal information changing section */}
        {/* <form onSubmit={handleSubmit}>
        <p>Nom d'utilisateur: {name} </p>
        <p>Email: {email} </p>
        
        <p>Vous pouvez ici changer votre mot de passe :</p>
        <label htmlFor="precedentPassword">Ancient mot de passe
            <input onChange={(event)=> handleChange(event, "password")} id="precedentPassword" type="password" value={precedentPassword} />
        </label>
        <label htmlFor="newPassword">Nouveau mot de passe :
            <input onChange={(event)=> handleChange(event, "password")} id="confirmNewPassword" type="password" value={newPassword} />
        </label>
        <label htmlFor="confirmNewPassword">Confirmez votre nouveau mot de passe :
            <input onChange={(event)=> handleChange(event, "password")} id="confirmNewPassword" type="password" value={confirmNewPassword} />
        </label>


        <button type="submit">submit</button>
    </form> */}


        {/* Personalized decks */}
        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Vos paquets personnalisés :</h1>
          <div className="personalizedDecksDisplay__decks-container">
          {personalizedDecks&&personalizedDecks.length>1?personalizedDecks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <Deck  deck={deck} /> </div>
            }):<p>Loading</p>}
          </div>
        </div>
        </>
        )
        

}
export default Profile