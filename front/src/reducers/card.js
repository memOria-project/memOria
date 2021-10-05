import { PICK_ORDER, RETURN_CARD, RESET_CARD, EDIT_CARD, EDIT_OPTIONS } from '../actions';

export const initialState = {
    defaultView:{
        isRecto:true
    },
    currentView:{
        isRecto:true
    },
    isFailed: false,
    currentCard: {
      currentDeckId: false,
      currentCardId: false,
      recto: 'recto',
      verso:'verso',
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
    case EDIT_CARD:{
        // const reducer = (previousValue, currentValue)=>({[previousValue.field]:previousValue.value, [currentValue.field]: currentValue.value })
        const reducer = (previousValue, currentValue)=>({...state, currentCard:{...state.currentCard, [currentValue.field]: currentValue.value, [previousValue.field]: previousValue.value }})

        const fields = action.field.reduce(reducer)
        console.log(fields);
        return fields
    }

    case EDIT_OPTIONS:{
      return {...state,
      isFailed: action.isFailed}
    }
    
  default:
  return state;
}
}
export default reducer