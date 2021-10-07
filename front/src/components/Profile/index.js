import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PersonalisedDeck from '../Deck/PersonalisedDeck'
import Loading from '../Loading'
import Form from '../Subscribe/Form'
import './Profile.scss'

const Profile = ()=>{

const {name, email} = useSelector((state)=> state.user);
const isConnected = useSelector((state)=> state.user.isConnected)
const personalizedDecks = useSelector((state) => (state.user.decks))
const [showForm, setShowForm] = useState(false);
const [loading, setLoading] = useState(true)
console.log(personalizedDecks);
const handleClick = () => {
  setShowForm((state)=> !state)
}
if(!isConnected){
  console.log("redirect")
  return <Redirect to="/signin" />
}
useEffect(()=> {
if(personalizedDecks || personalizedDecks.length === 0)
{
  setLoading(false)
}
}, [personalizedDecks])

return (<>
        <div> 
          <h2>Bienvenue {name}</h2>
        </div>

        <div className="profileEdit">
          <p><strong>Adresse Email</strong>: {email}</p>

          {showForm?
          <>
            <Form isInProfile={true} />
            <button onClick={handleClick}>retour</button>
          </>
          :
          <button onClick={handleClick}>Changer mes données/mot de passe</button>
          }
        </div>
        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Vos paquets personnalisés</h1>

          <div className="personalizedDecksDisplay__decks-container">
          <div className="personalDecks__new">
            + <br/>
            Nouveau paquet
          </div>
          {personalizedDecks&&personalizedDecks.length&&personalizedDecks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <PersonalisedDeck  deck={deck} /> </div>
            })}
          {loading&&<Loading />}
          </div>

          </div>
       
        </>
        )
        

}
export default Profile
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