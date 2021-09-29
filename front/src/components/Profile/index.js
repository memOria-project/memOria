import { useSelector } from 'react-redux'
import Deck from '../Deck';
import './Profile.scss';



const Profile = ()=>{
    
const {name, email} = useSelector((state)=> state.user);

const personalizedDecks = useSelector((state)=>(state.user.decks))
console.log(personalizedDecks);

return (<>
        <div> 
          <h2>Bienvenue {name}</h2>
        </div>

        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Vos paquets personnalisés :</h1>
          <div className="personalizedDecksDisplay__decks-container">
          {personalizedDecks.length>1?personalizedDecks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <Deck  deck={deck} /> </div>
            }):<p>Loading</p>}
          </div>
        </div>
        </>
        )
        

}
export default Profile