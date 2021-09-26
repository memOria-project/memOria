import {
    LOG_IN
  } from '../actions';

  
const auth = (store) => (next) => (action) => {
    const { email, name, password } = store.getState().user

    switch (action.type) {
      case LOG_IN:
        const back = store.getState().back;
        console.log(back);

        const login = {
            password,
            email,
            name
        }
        
        console.log(JSON.stringify(login));
        const options = 
        {
               method: 'POST',
               body: JSON.stringify(login)
        }

        const getUser = async () => {
            try{
            const request = await fetch(`${back}/login`, options)
            const response = await request.json()
            console.log(response)
            console.log(response.token);
            // Le token est inscrit dans le local storage
            localStorage.setItem("token", response.token)
            // Les infos sont enregistrés dans le profil utilisateur
            
            } catch(error) { console.log(error)}

        }
        getUser();
        next(action);
        break;
      default:
        next(action);
    }
  };

  export default auth; 