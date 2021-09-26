import {
    LOG_IN, UPDATE_USER, GET_USER
  } from '../actions';

  
const auth = (store) => (next) => (action) => {
    const { email, name, password } = store.getState().user

    switch (action.type) {
      case LOG_IN:
        const back = store.getState().back;
        const token = localStorage.getItem("token");

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

        const getToken = async () => {
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
        getToken();
        next(action);
        break;

      case GET_USER: 
        const optionsGetUser = 
        {
          method: 'GET', 
          header: {
            Authorization: token 
          }
        }
        const getUser = async () => {
          try {
            const request = await fetch(`${back}/user/info`, optionsGetUser)
            const response = await request.json()
            console.log(response);
            const {name, email} = response;
            store.dispatch({type: UPDATE_USER}, name, email)
          }
          catch(error) {console.log(`${error} | can't get user data :( `) }
        }
        getUser();
        
      default:
        next(action);
    }
  };

  export default auth; 