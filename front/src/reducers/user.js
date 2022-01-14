import { fas } from '@fortawesome/free-solid-svg-icons'
import { DISCONNECT, UPDATE_LOGIN, UPDATE_USER, UPDATE_SESSION, UPDATE_USER_DECKS, SET_ERROR, SET_LOADING, SET_LAST_ACTION } from '../actions'

const initialState = {
  isConnected: false,
  name: '',
  email: '',
  password: '',
  error: false,
  lastAction: '',
  decks: [],
  delayedCards: []
}

// Handle actions on authentication

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case ADMIN:
    //   return {name: 'Administrateur',
    //     token: false
    //   }

    case DISCONNECT:
      return initialState

    case UPDATE_LOGIN:
      return {
        ...state,
        [action.field]: action.value
      }

    case UPDATE_USER: {
      const { name, email, decks, password, delayedCards } = action
      console.log('UPDATE_USER', action)
      return {
        ...state,
        password,
        name,
        email,
        decks,
        delayedCards,
        isConnected: true

      }
    }
    case SET_ERROR: {
      const { message } = action
      return {
        ...state,
        error: message
      }
    }
    case SET_LOADING: {
      const { status } = action
      return {
        ...state,
        loading: status
      }
    }
    case UPDATE_USER_DECKS: {
      const { decks } = action
      return {
        ...state,
        decks
      }
    }
    case UPDATE_SESSION: {
      return {
        ...state,
        isConnected: action.isConnected
      }
    }
    case SET_LAST_ACTION: {
      const { lastAction } = action
      return {
        ...state,
        lastAction
      }
    }
    default:
      return state
  }
}

export default reducer
