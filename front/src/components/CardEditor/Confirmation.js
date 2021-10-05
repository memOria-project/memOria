import { NavLink } from 'react-router-dom'

const Confirmation = ({ isSuccess, deckId }) => {
  const path = `/deckEditor/${deckId}`
return (isSuccess?
        <div className="confirmation--Success"> 
          Votre carte a bien été enregistré. Soumettez une nouvelle carte, ou revenez au <NavLink to={path}>paquet</NavLink>
        </div>
        :
        <div> Carte non créé. Veuillez réessayer. </div>
)
}
export default Confirmation