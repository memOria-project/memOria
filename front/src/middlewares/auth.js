import {
    LOG_IN
  } from '../actions';
  
  
const auth = (store) => (next) => (action) => {
    switch (action.type) {
      case LOG_IN:
        const back = store.getState().back;
        console.log(back);
        const password = "123456";
        const username = "toto";
        
        const login = {
            password,
            username
        }

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