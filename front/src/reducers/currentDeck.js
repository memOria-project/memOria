
import {SET_CURRENT_DECK_ID, GET_CURRENT_DECK_CONTENT} from '../actions'

//no current deck at the start of the app
export const initialState = {
                              currentDeckId : false,
                              currentDeckContent: false
                            }


//Stock the id value of the deck currently viewed, and the deck itself
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_DECK_ID:
      return {...state, currentDeckId: action.currentDeckId};

    case GET_CURRENT_DECK_CONTENT:
      return {...state, currentDeckContent: action.currentDeckContent};
    
    default:
      return state;
  }
}

export default reducer;