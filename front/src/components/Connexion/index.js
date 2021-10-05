import './Connexion.scss'
import './Connexion-Desktop.scss'

import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { DELETE_TOKEN } from '../../actions'
// Display user connexion state and associated options
const Connexion = () => {
  const user = useSelector((state) => (state.user))
  const dispatch = useDispatch()
  const handleClick = () => {
    console.log("disconnect")
    dispatch({ type: DELETE_TOKEN })
    return (<Redirect to="/signin" />)
  }
  if (user.isConnected) {
    return (
    <div className="header__nav__connexion--connected">
      <NavLink to="/profile" className="login__user-profile-link">{user.name} (profil)</NavLink>
      <div className="login__signout" onClick={handleClick}><NavLink to="/signin">Se déconnecter </NavLink></div>
    </div>
    )
  } else {
    return (
      <div className="header__nav__connexion--disconnected">
         <NavLink to="/signin" className="login__signin">Se Connecter </NavLink>
         <NavLink to="/subscribe" className="login__signup">S'inscrire</NavLink>
      </div>
    )
  }
}

export default Connexion
