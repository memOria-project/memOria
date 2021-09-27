import './Connexion.scss'
import './Connexion-Desktop.scss'

import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DELETE_TOKEN } from '../../actions'
// Display user connexion state and associated options
const Connexion = () => {
  const user = useSelector((state) => (state.user))
  const dispatch = useDispatch()
  if (user.isConnected) {
    return (
    <div className="header__nav__connexion--connected">
      <div className="login__user-profile-link">{user.name} (profil)</div>
      <div className="login__signout" onClick={() => dispatch({ type: DELETE_TOKEN })}>Se déconnecter</div>
    </div>
    )
  } else {
    return (
      <div className="header__nav__connexion--disconnected">
         <NavLink to="/signin" className="login__signin">Se Connecter </NavLink>
        <div className="login__signup" > S'inscrire</div>
      </div>
    )
  }
}

export default Connexion
