import './nav_desktop.scss';
import './nav.scss';
import { NavLink } from 'react-router-dom';
import Connexion from '../Connexion';

const Nav = ()=>{
return (
    <header className="header">

      <div className="header__title">memOria</div>

      <nav className="header__nav">
          <div className="header__nav__current-page">
              <NavLink to="/">Accueil</NavLink>
          </div>
          <Connexion />
          
      </nav>
    </header>
    )
}
export default Nav