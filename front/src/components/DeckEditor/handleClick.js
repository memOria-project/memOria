
import { GET_CARD, DELETE_CARD, DELETE_DECK } from '../../actions'
import store from '../../store'

export const handleClickEdit = (event) => {
  // pour clickedCard: si l'utilisateur a cliqué sur l'icone, l'id de la carte est récupéré via event.target.id.
  // pour clickedCard: si l'utilisateur a cliqué sur le bouton (hors icone), l'id de la carte est récupéré via event.current.target.id

  const currentDeckInEditor = store.getState().currentDeck.cards
  const clickedCard = event.currentTarget.id ? event.currentTarget.id : event.target.id
  const cardContent = currentDeckInEditor.find((card) => clickedCard == card.id)
  // cette conditionnelle est là pour éviter une erreur "cardContent undefined". Elle ne me semblait pas nécessaire initialement, car il ne devrait pas y avoir de cas où cardContent est undefined, mais bon...
  if (cardContent) {
    store.dispatch({
      type: GET_CARD,
      field: [
        {
          field: 'recto',
          value: cardContent.recto
        },
        {
          field: 'verso',
          value: cardContent.verso
        }
      ]
    })
  }
}

export const handleClickDelete = (event, isDeck, isClicked, setIsClicked) => {
  // confirmations status
  setIsClicked(state => !state)
  // récupération de l'id
  const idTakenFromIcon = event.target?.viewportElement?.parentElement?.id
  const idTakenFromButton = event.target.id
  const cardIdString = idTakenFromButton || idTakenFromIcon
  const cardId = parseInt(cardIdString, 10)
  const deckId = store.getState().currentDeck.id
  // suppression si l'utilisateur en est à son deuxième clique.
  // si c'est le premier, on reset après qq secondes
  if (isClicked) {
    if (isDeck) {
      store.dispatch({ type: DELETE_DECK, deckId })
    } else {
      store.dispatch({ type: DELETE_CARD, cardId })
    }
  } else {
    setTimeout(() => setIsClicked(state => !state), 5000)
  }
}
