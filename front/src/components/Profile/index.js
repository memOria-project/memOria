import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PersonalisedDeck from '../Deck/PersonalisedDeck';
import Loading from '../Loading';
import './Profile.scss';



const Profile = ()=>{
    
const {name, email} = useSelector((state)=> state.user);
const isConnected = useSelector((state)=> state.user.isConnected)
const personalizedDecks = useSelector((state)=>(state.user.decks))
console.log(personalizedDecks);

if(!isConnected){
  console.log("redirect")
  return <Redirect to="/signin" />
}
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
        
        {/* lien vers l'éditeur de cartes */}
        {/* <NavLink to="/deckEditor/1">Éditeur de cartes</NavLink> */}

        {/* Personalized decks */}
        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Vos paquets personnalisés :</h1>
          <div className="personalizedDecksDisplay__decks-container">
          {personalizedDecks&&personalizedDecks.length?personalizedDecks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <PersonalisedDeck  deck={deck} /> </div>
            }):<Loading />}
          </div>
        </div>
        </>
        )
        

}
export default Profile