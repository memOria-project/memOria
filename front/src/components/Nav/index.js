import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Connexion from './Connexion';
import './nav.scss';
import './nav_desktop.scss';


const Nav = ()=>{
return (
    <header className="nav">

      <div className="nav__logo"><NavLink to="/">memOria</NavLink></div>

      <nav className="nav__items">
          <div className="nav__items__item nav__items__item--hidden">
              <NavLink title="Retour à l'accueil" to="/"><FontAwesomeIcon icon={faHome}/></NavLink>
          </div>
          <Connexion />
          
      </nav>
    </header>
    )
}
export default Nav