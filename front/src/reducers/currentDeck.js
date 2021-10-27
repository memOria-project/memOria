
import { SET_CURRENT_DECK_ID, GET_CURRENT_DECK_CONTENT, SET_AS_MODIFIED, GET_CARD } from '../actions'

// les "false" par défaut sont pour faciliter certaines conditionnelles
// ce n'est pas idéal, mais je n'ai pas envie de passer du temps dessus pour l'instant

export const initialState = {
  deckId: false,
  cards: false,
  title: false,
  tags: false,
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

    case GET_CURRENT_DECK_CONTENT: {
      const { id, title, tags, cards } = action.currentDeckContent
      /* cette conditionnelle vise à éviter des boucles de render.
      currentDeck.deckId est lié à plusieurs useEffect, et le modifier "pour rien" cause des effets de bords indésirables
      Cette n'est pas très lisible et pourrait être améliorer, par ex au niveau de middleware/api.js
      */
      if (state.deckId != id) {
        return {
          ...state,
          title,
          tags,
          cards,
          id
        }
      } else {
        return {
          ...state,
          title,
          tags,
          cards
        }
      }
    }
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
    //! le state est mis à jour à partir de la valeur de currentDeck - pas à partir de l'API!
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
