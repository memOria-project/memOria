
import { SET_CURRENT_DECK_ID, GET_CURRENT_DECK_CONTENT, SET_AS_MODIFIED, GET_CARD } from '../actions'

// no current deck at the start of the app
export const initialState = {
  deckId: false,
  currentDeckContent: false,
  currentCard: {
    deckId: false,
    currentCardId: false,
    recto: 'recto',
    verso: 'verso'
  },
  isModified: {
    state: false,
    count: 0
  }
}

// Stock the id value of the deck currently viewed, and the deck itself
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_DECK_ID:
    {
      return {
        ...state,
        deckId: action.deckId
      }
    }

    case GET_CURRENT_DECK_CONTENT:
      console.log('action.currentDeckContent', action.currentDeckContent)
      return { ...state, currentDeckContent: action.currentDeckContent }

    // ce cas est utilisé dans CardEditor, pour déterminer si un message d'erreur/confirmation doit être affiché
    case SET_AS_MODIFIED:
      return {
        ...state,
        isModified: {
          state: action.isModified,
          count: state.isModified.count + 1
        }
      }

    // ce cas est utilisé dans deckEditor quand l'utilisateur clique sur "éditer une carte".
    //! le state est mis à jour à partir de la valeur de currentDeckContent - pas à partir de l'API!
    case GET_CARD: {
      const reducer = (previousValue, currentValue) => (
        {
          ...state,
          currentCard: {
            ...state.currentCard,
            [currentValue.field]: currentValue.value,
            [previousValue.field]: previousValue.value
          }
        })

      const fields = action.field.reduce(reducer)

      return fields
    }

    default:
      return state
  }
}

export default reducer
