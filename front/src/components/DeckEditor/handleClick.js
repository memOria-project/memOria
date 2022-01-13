
import { GET_CARD, DELETE_CARD, DELETE_DECK } from '../../actions'
import store from '../../store'
import { saveAs } from 'file-saver'
import { getMyDate } from './getMyDate'

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

export const handleClickDelete = (event, isDeck, isClicked, setIsClicked, setShowModal) => {
  // confirmations status
  setIsClicked(state => !state)
  // récupération de l'id
  const idTakenFromIcon = event.target?.viewportElement?.parentElement?.id
  const idTakenFromButton = event.target.id
  const cardIdString = idTakenFromButton || idTakenFromIcon
  const cardId = parseInt(cardIdString, 10)
  // suppression si l'utilisateur en est à son deuxième clique.
  // si c'est le premier, on reset après qq secondes
  if (isClicked) {
    if (isDeck) {
      setShowModal(true)
      setIsClicked(false)
    } else {
      store.dispatch({ type: DELETE_CARD, cardId })
    }
  } else {
    setTimeout(() => setIsClicked(false), 3000)
  }
}

export const handleClickExport = (cards = [], title = 'Paquet vide!') => {
  // éléments inclus dans le fichier
  const deckTitle = `## ${title}`
  const allCards = cards.map((card) => {
    const cardNumber = cards.indexOf(card) + 1
    return `
### card ${cardNumber} \n 
**recto** \n
${card.recto} \n
**verso** \n
${card.verso} \n
***
\n
`
  }).join('')

  const url = window.location.href
  const dateOfExport = getMyDate(Date.now())

  // le fichier est assemblé dans la variable blob, en utilisant file-saver.js
  const blob = new Blob(
    [
`
${deckTitle} \n
${allCards} \n
exporté depuis memOria (${url} - ${new Date(Date.now())}
`
    ],

    { type: 'text/plain;charset=utf-8' })

  saveAs(blob, `${title}__${dateOfExport}.md`)
}

export const handleClickDeleteDeck = (setShowModal, deckId) => {
  setShowModal(false)
  store.dispatch({ type: DELETE_DECK, deckId })
}
