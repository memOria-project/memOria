//no current deck at the start of the app
import {SET_CURRENT_DECK_ID, SET_CURRENT_DECK_CONTENT} from '../actions'


export const initialState = {
                              currentDeckId : null,
                              currentDeckContent: null
                            }


//Stock the id value of the deck currently viewed, and the deck itself
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_DECK_ID:
      return {...state, currentDeckId: action.current_deck_id};
      break;

    case SET_CURRENT_DECK_CONTENT:
      return {...state, currentDeckContent: action.currentDeckContent};
      break;
    
    default:
      return state;
  }
}

export default reducer;