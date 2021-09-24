import './Connexion.scss'
import './Connexion-Desktop.scss'

//Display user connexion state and associated options
const Connexion= () => { 

  if (false) { return (
    <div className="header__nav__connexion--connected">
      <div className="login__user-profile-link">Utilisateur Lambda (profil)</div>
      <a className="login__signout" href="#">Se déconnecter</a>
    </div>
    

  )

  } else {
    return (
    <div className="header__nav__connexion--disconnected">
      <a className="login__signin" href="#" >Se Connecter</a>
      <div className="login__signup">S'inscrire</div>
    </div>
    )
  }
}

export default Connexion;