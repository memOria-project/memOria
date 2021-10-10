
import { NavLink } from 'react-router-dom';
import Connexion from './Connexion';
import './nav.scss';
import './nav_desktop.scss';


const Nav = ()=>{
return (
    <header className="nav">

      <div className="nav__logo">memOria</div>

      <nav className="nav__items">
          <div className="nav__items__item">
              <NavLink to="/">Accueil</NavLink>
          </div>
          <Connexion />
          
      </nav>
    </header>
    )
}
export default Nav