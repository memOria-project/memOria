import { NavLink } from 'react-router-dom'

const Confirmation = ({ isSuccess, deckId }) => {
  const path = `/deckEditor/${deckId}`
return (isSuccess?
        <div className="confirmation--Success"> 
          Votre carte a bien été enregistrée. Soumettez une nouvelle carte, ou revenez au <NavLink to={path}>paquet</NavLink>
        </div>
        :
        <div> Carte non créée. Veuillez réessayer. </div>
)
}
export default Confirmation