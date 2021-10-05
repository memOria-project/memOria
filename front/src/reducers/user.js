import { DISCONNECT, UPDATE_LOGIN, UPDATE_USER, UPDATE_SESSION } from '../actions'

const initialState = {
  isConnected: false,
  name: '',
  email: '',
  password: '',
  decks: []
}

// Handle actions on authentication

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case ADMIN:
    //   return {name: 'Administrateur',
    //     token: false
    //   }

    case DISCONNECT:
      return {
        ...state,
        isConnected: false,
        name: '',
        email: ''
      }

    case UPDATE_LOGIN:
      return {
        ...state,
        [action.field]: action.value
      }

    case UPDATE_USER: {
      const {name, email, decks, password } = action
      console.log("UPDATE_USER", action)
      return {...state,
        password,
        name,
        email,
        decks,
        isConnected: true

      }
    }

    case UPDATE_SESSION: {
      return {...state,
        isConnected: action.isConnected}
        
    }
    default:
      return state
  }
}

export default reducer
