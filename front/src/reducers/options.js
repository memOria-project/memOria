import { PICK_DEFAULT_CARD_SIDE, RETURN_CARD, RESET_CARD, PICK_NEW_GAME, PICK_ORDER } from '../actions'

export const initialState = {
  defaultView: {
    isRecto: true
  },
  currentView: {
    isRecto: true
  },
  databaseSelector: '',
  order: 'RANDOM'

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

    case PICK_ORDER: {
      return {
        ...state,
        order: action.value
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

    default:
      return state
  }
}
export default reducer
