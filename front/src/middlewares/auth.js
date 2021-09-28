import { LOG_IN, UPDATE_USER, GET_USER, DELETE_TOKEN, DISCONNECT, UPDATE_SESSION, CHECK_TOKEN } from '../actions'

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
          const { name, email } = response
          const token = request.headers.get('Authorization')
          console.log(response);
          //   for (var pair of request.headers.entries()) {
          //     console.log(pair[0]+ ': '+ pair[1]);
          //  }
          // // Le token est inscrit dans le local storage
          localStorage.setItem('token', token)
          store.dispatch({type: UPDATE_USER, email, name })

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
        if(response.name) {
        store.dispatch({ type: UPDATE_SESSION, isConnected:true })
        }
        else {
        store.dispatch({ type: UPDATE_SESSION, isConnected:false })

        }
        // dispatch({type:GET_USER})
      } catch (error) { console.log(`${error} | can't get user data :( `) }
    }
    checkToken();
    }
    default:
      next(action)
  }
}

export default auth
