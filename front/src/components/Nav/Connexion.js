

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
      <>
        <div className="nav__items__item">
          <NavLink to="/profile" className="login__user-profile-link">{user.name} (profil)</NavLink>
        </div>
          <div className="login__signout" onClick={handleClick}><NavLink to="/signin">Se déconnecter </NavLink>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="nav__items__item">
          <NavLink to="/signin" className="login__signin">Se Connecter </NavLink>
        </div>
        <div>
          <NavLink to="/subscribe" className="login__signup">S'inscrire</NavLink>
        </div>
      </>
    )
  }
}

export default Connexion
