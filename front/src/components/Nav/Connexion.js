
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { DELETE_TOKEN } from '../../actions'
// Display user connexion state and associated options
const Connexion = () => {
  const user = useSelector((state) => (state.user))
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({ type: DELETE_TOKEN })
    return (<Redirect to="/signin" />)
  }
  if (user.isConnected) {
    return (
      <>
        <div className="nav__items__item">
          <NavLink title="Ton profil" to="/profile" className="nav__items__item--profile">{user.name}</NavLink>
        </div>
          <div className="nav__items__item" onClick={handleClick}><NavLink title="Déconnexion" to="/"><FontAwesomeIcon icon={faDoorOpen}/></NavLink>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="nav__items__item">
          <NavLink to="/signin" >Se Connecter </NavLink>
        </div>
        <div className="nav__items__item">
          <NavLink to="/subscribe" >S&apos;inscrire</NavLink>
        </div>
      </>
    )
  }
}

export default Connexion
