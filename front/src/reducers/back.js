import { REQUEST_SUCCESS } from '../actions'

// const initialState="https://memoriapo.herokuapp.com/v1"
// API ouverte en illimité :
const initialState = {
  url: process.env.REACT_APP_API_ORIGIN || 'https://memoria-api.german-fighter.workers.dev/v1',
  isSuccessful: false
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      return {
        ...state,
        isSuccessful: action.isSuccessful
      }
    }
    default:
      return state
  }
}

export default reducer
