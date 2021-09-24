import './Connexion.scss'
import './Connexion-Desktop.scss'
import { useSelector } from 'react-redux';

//Display user connexion state and associated options
const Connexion= () => { 

  const user = useSelector((state)=>(state.user))
  console.log(user);

  if (user) { return (
    <div className="header__nav__connexion--connected">
      <div className="login__user-profile-link">{user} (profil)</div>
      <div className="login__signout" >Se déconnecter</div>
    </div> 
    
    )

  } else {
    return (
      <div className="header__nav__connexion--disconnected">
        <div className="login__signin">Se Connecter</div>
        <div className="login__signup">S'inscrire</div>
      </div>  
    )
  }
}

export default Connexion;