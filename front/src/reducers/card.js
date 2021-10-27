import { PICK_DEFAULT_CARD_SIDE, RETURN_CARD, RESET_CARD, EDIT_CARD, PICK_NEW_GAME } from '../actions'

export const initialState = {
  defaultView: {
    isRecto: true
  },
  currentView: {
    isRecto: true
  },
  isFailed: false,
  isAlternateRequired: false,
  isDelayedReviewOn: false,
  currentCard: {
    currentDeckId: false,
    currentCardId: false,
    recto: 'recto',
    verso: 'verso'
  }
}
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case PICK_DEFAULT_CARD_SIDE: {
      return {
        ...state,
        defaultView: {
          isRecto: action.isRecto
        },
        currentView: {
          isRecto: action.isRecto
        }
      }
    }

    case PICK_NEW_GAME: {
      return {
        ...state,
        [action.field]: action.value
      }
    }

    // Cas utilisé quand l'utilisateur clique sur une carte pour en voir l'autre coté
    case RETURN_CARD: {
      return {
        ...state,
        currentView: {
          isRecto: !action.isRecto
        }
      }
    }

    // remet la carte du coté (recto ou verso) choisi par l'utilisateur via PICK_DEFAULT_SIDE
    case RESET_CARD: {
      return {
        ...state,
        currentView: {
          isRecto: action.isRecto
        }
      }
    }
    case EDIT_CARD: {
      // const reducer = (previousValue, currentValue)=>({[previousValue.field]:previousValue.value, [currentValue.field]: currentValue.value })
      const reducer = (previousValue, currentValue) => ({ ...state, currentCard: { ...state.currentCard, [currentValue.field]: currentValue.value, [previousValue.field]: previousValue.value } })

      const fields = action.field.reduce(reducer)
      console.log(fields)
      return fields
    }

    default:
      return state
  }
}
export default reducer
