import { LOG_IN, UPDATE_USER, GET_USER } from '../actions'

const auth = (store) => (next) => (action) => {
  const { email, name, password } = store.getState().user
  const back = store.getState().back;
  const token = localStorage.getItem('token');

  switch (action.type) {
    case LOG_IN: {
      console.log(back)
      const login = {
        password,
        email,
      }

      console.log(JSON.stringify(login));
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(login)
      }

      const getToken = async () => {
        try {
          const request = await fetch(`${back}/login`, options)
          const response = await request.json()
          const { name, email } = response
          const token = request.headers.get('Authorization')
        //   for (var pair of request.headers.entries()) {
        //     console.log(pair[0]+ ': '+ pair[1]);
        //  }
          // // Le token est inscrit dans le local storage
          localStorage.setItem('token', token)
          store.dispatch({type:UPDATE_USER, email, name })

          // // Les infos sont enregistrés dans le profil utilisateur
        } catch (error) { console.log(error) }

      }
      getToken();
      next(action);
      break;
    }
    case GET_USER: {
      console.log(token)
      const optionsGetUser =
      {
        method: 'GET',
        headers: {
          'Authorization': token
        },
      }
      const getUser = async () => {
        try {
          const request = await fetch(`${back}/user/infos`, optionsGetUser)
          const response = await request.json()
          console.log(response)
          const { name, email } = response
          store.dispatch({ type: UPDATE_USER, name, email})
          // dispatch({type:GET_USER})

        }
        catch(error) {console.log(`${error} | can't get user data :( `) }
      }
      getUser();
      next(action);
      break;
    }
    default:
      next(action);
  }
}

export default auth;