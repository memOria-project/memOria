import './Connexion.scss'
import './Connexion-Desktop.scss'

//Affiche l'état de connexion de l'utilisateur dans la page d'accueil
const Connexion= () => { 

  if (false) { return (
  <div className="header__nav__connexion--disconnected">
    <div className="login__signin">Se Connecter</div>
    <div className="login__signup">S'inscrire</div>
  </div>
  )

  } else {
    return (<div className="header__nav__connexion--connected">
    <div className="login__user-profile-link">Utilisateur Lambda (profil)</div>
    <div className="login__signout">Se déconnecter</div>
  </div>)
  }
}

export default Connexion;