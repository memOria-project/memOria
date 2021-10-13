
import {SET_CURRENT_DECK_ID, GET_CURRENT_DECK_CONTENT, EDIT_CARD, EDIT_CURRENT_DECK} from '../actions'

//no current deck at the start of the app
export const initialState = {
                              currentDeckId : false,
                              currentDeckContent: false,
                              isModified: {
                                state:false,
                                count:0
                            }
                          }


//Stock the id value of the deck currently viewed, and the deck itself
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_DECK_ID:

      return {...state, currentDeckId: action.currentDeckId};

    case GET_CURRENT_DECK_CONTENT:
      console.log("action.currentDeckContent", action.currentDeckContent)
      return {...state, currentDeckContent: action.currentDeckContent};

    case EDIT_CURRENT_DECK:
      return {...state,
    isModified:{
      state: action.isModified,
      count: state.isModified.count +1
    } 
      }
    default:
      return state;
  }
}

export default reducer;