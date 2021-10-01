import { LOG_IN, UPDATE_USER, GET_USER, DELETE_TOKEN, DISCONNECT, UPDATE_SESSION, CHECK_TOKEN, SUBSCRIBE } from '../actions'

const auth = (store) => (next) => (action) => {
  const { email, password } = store.getState().user
  const back = store.getState().back
  const token = localStorage.getItem('token')

  switch (action.type) {
    case LOG_IN: {
      const login = {
        password,
        email
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      }

      const getToken = async () => {
        try {
          const request = await fetch(`${back}/login`, options)
          const response = await request.json()
          const { name, email, decks } = response
          const token = request.headers.get('Authorization')
          console.log(response);
          //   for (var pair of request.headers.entries()) {
          //     console.log(pair[0]+ ': '+ pair[1]);
          //  }
          // // Le token est inscrit dans le local storage
          localStorage.setItem('token', token)
          store.dispatch({type: UPDATE_USER, email, name, decks })

          // // Les infos sont enregistrés dans le profil utilisateur
        } catch (error) { console.log(error) }
      }
      getToken()
      next(action)
      break
    }
    case GET_USER: {
      const optionsGetUser =
      {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }
      const getUser = async () => {
        try {
          const request = await fetch(`${back}/user/infos`, optionsGetUser)
          const response = await request.json()
          const { name, email, decks } = response
          store.dispatch({ type: UPDATE_USER, name, email, decks })
          // dispatch({type:GET_USER})
        } catch (error) { console.log(`${error} | can't get user data :( `) }
      }
      getUser()
      next(action)
      break
    }
    case DELETE_TOKEN: {
      localStorage.removeItem('token')
      store.dispatch({ type: DISCONNECT })
      next(action)
      break
    }
    case CHECK_TOKEN: {
      const optionsGetUser =
      {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }
      const checkToken = async () => {
      try {
        const request = await fetch(`${back}/user/infos`, optionsGetUser)
        const response = await request.json()
        const { name, email, decks } = response
 
        console.log("Token has been checked");
        if(response.name) {
        // store.dispatch({ type: UPDATE_SESSION, isConnected:true })
        store.dispatch({ type: UPDATE_USER, isConnected:true, name, email, decks })

        }
        else {
        store.dispatch({ type: UPDATE_SESSION, isConnected:false })

        }
        // dispatch({type:GET_USER})
      } catch (error) { console.log(`${error} | can't get user data :( `) }
    }
    checkToken();
    break;
    }
    case SUBSCRIBE: {
      const { name, email, password } = action.data;
      const form = {
        name,
        email,
        password
      }
      console.log(JSON.stringify(form))
      const options = {
        method:'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }
      const postUser = async () => {
      try {
        const request = await fetch(`${back}/user-manager`, options)
        const response = await request.json()
        if(response){
        store.dispatch({type:UPDATE_USER}, password, email, name)
        store.dispatch({type:LOG_IN})
        }
        }
        catch (error){console.log(error)}
      }
      postUser()
      break
    
    }
    default:
      next(action)
  }
}

export default auth
