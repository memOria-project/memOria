import { LOG_IN, UPDATE_USER, GET_USER, DELETE_TOKEN, DISCONNECT, UPDATE_SESSION, CHECK_TOKEN, SUBSCRIBE, UPDATE_PROFILE, REQUEST_SUCCESS } from '../actions'

const auth = (store) => (next) => (action) => {
  const { email, password } = store.getState().user
  const back = store.getState().back.url
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
      console.log('LOGIN', JSON.stringify(login))

      const getToken = async () => {
        try {
          const request = await fetch(`${back}/login`, options)
          const response = await request.json()
          const { name, email, decks, delayedCards } = response
          const token = request.headers.get('Authorization')
          console.log(response)
          //   for (var pair of request.headers.entries()) {
          //     console.log(pair[0]+ ': '+ pair[1]);
          //  }
          // // Le token est inscrit dans le local storage
          localStorage.setItem('token', token)
          store.dispatch({ type: UPDATE_USER, email, name, decks, delayedCards })

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
          Authorization: token
        }
      }
      const getUser = async () => {
        try {
          const request = await fetch(`${back}/user/infos`, optionsGetUser)
          const response = await request.json()
          console.log('getUser', response)
          const { name, email, decks, cardId } = response
          store.dispatch({ type: UPDATE_USER, name, email, decks, cardId })
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
          Authorization: token
        }
      }
      const checkToken = async () => {
        try {
          const request = await fetch(`${back}/user/infos`, optionsGetUser)
          const response = await request.json()
          const { name, email, decks, delayedCards } = response

          console.log('Token has been checked')
          console.log('CHECK_TOKEN', response)
          if (response.name) {
            // store.dispatch({ type: UPDATE_SESSION, isConnected:true })
            store.dispatch({ type: UPDATE_USER, isConnected: true, name, email, delayedCards })
          } else {
            store.dispatch({ type: UPDATE_SESSION, isConnected: false })
          }
        // dispatch({type:GET_USER})
        } catch (error) { console.log(`${error} | can't get user data :( `) }
      }
      checkToken()
      break
    }
    case SUBSCRIBE: {
      const { name, email, password } = action.data
      const form = {
        name,
        email,
        password
      }
      console.log(JSON.stringify(form))
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }
      const postUser = async () => {
        try {
          const request = await fetch(`${back}/signup`, options)
          const response = await request
          console.log(response)
          if (response.status === 204 || response.status === 201 || response.status === 200) {
            store.dispatch({ type: UPDATE_USER, password, email, name })
            store.dispatch({ type: REQUEST_SUCCESS, isSuccessful: true })
            // supprimer LOG_IN si on souhaite éviter le login automatique après l'inscription pour raison de sécu
            store.dispatch({ type: LOG_IN })
          }
        } catch (error) { console.log(error) }
      }
      postUser()
      break
    }
    case UPDATE_PROFILE: {
      const { name, email, password, oldpassword } = action.data
      const newPassword = password
      const currentPassword = oldpassword
      const form = {
        name,
        email,
        newPassword,
        currentPassword
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token

        },
        body: JSON.stringify(form)
      }
      const updateUser = async () => {
        try {
          const request = await fetch(`${back}/user/update`, options)
          const response = await request
          console.log()
          if (response.status === 204 || response.status === 201 || response.status === 200) {
            console.log('user mis à jour')
            store.dispatch({ type: CHECK_TOKEN })
            // supprimer LOG_IN si on souhaite éviter le login automatique après l'inscription pour raison de sécu
          } else {
            console.log('erreur')
          }
        } catch (error) { console.log(error) }
      }
      updateUser()
      break
    }
    default:
      next(action)
  }
}

export default auth
