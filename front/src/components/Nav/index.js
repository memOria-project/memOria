import './nav_desktop.scss';
import './nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = ()=>{
return (
    <header className="header">

    <div className="header__title">memOria</div>

    <nav className="header__nav">
        <div className="header__nav__placeholder"> </div>
        <div className="header__nav__current-page">
            <NavLink to="/">Accueil</NavLink>
        </div>
  
        <div className="header__nav__connexion">
            <div className="login__signin">Se Connecter</div>
            <div className="login__signup">S'inscrire</div>
        </div>
    </nav>
    </header>
    )
}
export default Nav