import { PICK_ORDER, RETURN_CARD, RESET_CARD, SET_CURRENT_CARD } from '../actions';

export const initialState = {
    defaultView:{
        isRecto:true
    },
    currentView:{
        isRecto:true
    },
    currentCard: {
      currentDeckId: false,
      currentCardId: false
    }
}
const reducer = (state = initialState, action = {}) => {
switch (action.type){
    case PICK_ORDER:{
        return {...state,
            defaultView: {
                isRecto: action.isRecto
            },
            currentView: {
                isRecto: action.isRecto
            }}
        
    }
    
    case RETURN_CARD:{
        return {...state,
            currentView:{
                isRecto: !action.isRecto
            }}
        
    }
    case RESET_CARD:{
        return {...state,
            currentView:{
                isRecto: action.isRecto
            }}
    }

    case SET_CURRENT_CARD: {
      return {...state,
        currentCard: {  
                        currentDeckId: action.currentDeckId, 
                        currentCardId: action.currentCardId
                      }
      }      
    }
    
  default:
  return state;
}
}
export default reducer