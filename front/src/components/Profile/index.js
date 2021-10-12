import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PersonalisedDeck from '../Deck/PersonalisedDeck'
import Loading from '../Loading'
import Form from '../Subscribe/Form'
import NewDeckForm from './NewDeckForm'
import './Profile.scss'
import { Fragment } from 'react';


const Profile = ()=>{
const {user} = useSelector((state)=> state);
const {name, email} = user
const isConnected = useSelector((state)=> state.user.isConnected)
const personalizedDecks = useSelector((state) => (state.user.decks))
const [showForm, setShowForm] = useState(false);
const [showNewDeck, setShowNewDeck] = useState(false)
const [loading, setLoading] = useState(true)
console.log(personalizedDecks);
const handleClick = (event) => {
  console.log(event)
  if(event.target.name === "newDeck"||event.target.innerText === "Nouveau paquet" || event.target.textContent === "+Nouveau paquet" || event.target.textContent === "+")
  {
    setShowNewDeck((state)=>!state)
  }
  else{
  setShowForm((state)=> !state)
  }
}

useEffect(()=> {
if(personalizedDecks || personalizedDecks?.length === 0)
{
  setLoading(false)
}
setShowForm(false)
}, [personalizedDecks, user])

if(!isConnected){
  console.log("redirect")
  return <Redirect to="/signin" />
}

return (<>
        <div> 
          {/* <h2>Bienvenue {name}</h2> */}
        </div>

        {/* <div className="profileEdit">
          <p><strong>Adresse Email</strong>: {email}</p>

        </div> */}
        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Tes paquets</h1>  

          <div className="personalizedDecksDisplay__decks-container">
          <div name="newDeck" className="deck deck--new" onClick={handleClick}>
            <p>+</p>
            <p>Nouveau paquet</p>
          </div>
          {showNewDeck&&
          <NewDeckForm handleClick={handleClick} setShowNewDeck={setShowNewDeck} />
          }
          {personalizedDecks&&personalizedDecks.length&&personalizedDecks.map((deck) => {
                return <Fragment key={deck.id}> <PersonalisedDeck deck={deck} /> </Fragment>
            })}


          {loading&&<Loading />}

          </div>

          </div>
          {showForm?
          <>
            <Form isInProfile={true} />
            <button onClick={handleClick}>retour</button>
          </>
          :
          <button class="btn__submit" onClick={handleClick}>Infos personnelles</button>
          }
          
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