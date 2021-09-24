import './Connexion.scss'
import './Connexion-Desktop.scss'

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

//Display user connexion state and associated options
const Connexion= () => { 

  const user = useSelector((state)=>(state.user))
  console.log(user);
  const dispatch = useDispatch();


  if (user.isConnected) { return (
    <div className="header__nav__connexion--connected">
       <NavLink to="/signin"><div className="login__user-profile-link">{user.name} (profil)</div></NavLink>
      <div className="login__signout" onClick={() => dispatch({type: "DISCONNECT"})}>Se déconnecter</div>
    </div> 
    
    )


  } else {
    return (
      <div className="header__nav__connexion--disconnected">
        <a className="login__signin" onClick={() =>  dispatch({type: "ADMIN"})}>Se Connecter</a>
        <div className="login__signup" >S'inscrire</div>
      </div>  
    )
  }
}

export default Connexion;