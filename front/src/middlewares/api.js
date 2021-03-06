import {
  getAllDecks, GET_CARD, FETCH_DECKS, FETCH_CARDS, POST_CARD, SET_AS_MODIFIED, DELETE_CARD, DELAY_CARD, CREATE_DECK
  , FETCH_USER_DECKS, UPDATE_USER_DECKS, SET_CURRENT_DECK_CONTENT, DELETE_DECK, SET_LOADING, SET_ERROR, DISCONNECT, SET_LAST_ACTION
} from '../actions'
import { cleanObject } from '../functions/DOMPurify'

const api = (store) => (next) => (action) => {
  const token = localStorage.getItem('token')
  const back = store.getState().back.url

  switch (action.type) {
    case FETCH_DECKS:
    {
      const options =
      {
        method: 'GET'
      }
      const getDecks = async () => {
        try {
          const request = await fetch(`${back}/decks`, options)
          const response = await request.json()
          store.dispatch(getAllDecks(response))
        } catch (error) { console.log(error) }
      }
      getDecks()
      next(action)
      break
    }

    case FETCH_CARDS:
    {
      const { deckId } = store.getState().currentDeck
      const fetchCardsOptions =
      {
        method: 'GET'
      }
      const getCurrentDeck = async () => {
        try {
          const request = await fetch(`${back}/deck/${deckId}/`, fetchCardsOptions)
          store.dispatch(
            { type: SET_CURRENT_DECK_CONTENT, currentDeckContent: false })
          const response = await request.json()
          if (request.status === 204) { // le paquet est vide ou n'existe pas
            store.dispatch({ type: SET_CURRENT_DECK_CONTENT, currentDeckContent: false })
            console.log('pas de paquets')
          } else {
            console.log('get Current Deck', response)
            store.dispatch({ type: SET_CURRENT_DECK_CONTENT, currentDeckContent: response })
          }
        } catch (error) { console.log(error) }
      }
      getCurrentDeck()
      next(action)
      break
    }
    case FETCH_USER_DECKS:
    {
      const options = {
        method: 'GET',
        headers: {
          Authorization: token
        }

      }
      const getUserDecks = async () => {
        try {
          const request = await fetch(`${back}/user/cards/`, options)
          const response = await request.json()
          if (request.ok) {
            store.dispatch({ type: UPDATE_USER_DECKS, decks: response })
          } else {
            console.log(
              `UPDATE_USER_DECKS failed: ${request.status}, ${response}`)
            if (response == 'jwt malformed') {
              window.location.reload(true)
            } else {
              store.dispatch({ type: SET_LOADING, status: false })
              store.dispatch({ type: SET_ERROR, message: response })
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      getUserDecks()
      break
    }
    case POST_CARD: {
      // const { id } = store.getState().user
      const { currentCard, deckId } = store.getState().currentDeck
      const { recto, verso } = currentCard
      // const id = cardId
      const newCard = {
        recto,
        verso,
        deckId,
        id: action.cardId
      }
      console.log(cleanObject(newCard))
      const options =
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(cleanObject(newCard))
      }
      const postCard = async () => {
        try {
          const request = await fetch(`${back}/card`, options)
          const response = await request.json()

          store.dispatch({ type: SET_LOADING, status: false })
          if (request.ok) {
            store.dispatch({ type: SET_AS_MODIFIED, isModified: true })
            store.dispatch({ type: GET_CARD, field: [{ field: 'recto', value: '' }, { field: 'verso', value: '' }] })
            console.log('new card' + response)
          } else {
            console.log(response)
            store.dispatch({ type: SET_ERROR, message: response })
            //  utilis?? pour stopper la redirection lors d'un ??chec d'??dit de carte
            store.dispatch({ type: SET_AS_MODIFIED, isModified: false })
          }
        } catch (error) { console.log(error) }
      }
      postCard()
      next(action)
      break
    }
    case DELETE_CARD: {
      const cardToBeDeleted = {
        id: action.cardId
      }
      const options =
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(cardToBeDeleted)
      }
      const deleteCard = async () => {
        try {
          const request = await fetch(`${back}/card`, options)
          const response = await request.json()
          if (request.ok) {
            console.log(`carte supprim??e: ${response}`)
          }
          store.dispatch({ type: FETCH_USER_DECKS })
        } catch (error) { console.log(error) }
      }
      deleteCard()
      break
    }
    case DELAY_CARD: {
      const cardToBeDelayed = {
        id: action.id
      }
      const method = action.method === 'post' ? 'POST' : 'DELETE'
      console.log({ cardToBeDelayed, method })
      const options =
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(cardToBeDelayed)
      }
      const delayCard = async () => {
        try {
          const request = await fetch(`${back}/card/delay`, options)
          const response = await request.json()
        } catch (error) { console.log(error) }
      }
      delayCard()
      break
    }

    case CREATE_DECK: {
      const { name, tags, id } = action.data
      const title = name
      const newDeck = {
        title,
        tag: [tags],
        id
      }
      console.log(tags)
      const options =
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(newDeck)
      }

      const createDeck = async () => {
        try {
          const request = await fetch(`${back}/deck/`, options)
          const response = await request.json()
          const { deckId, status } = response
          if (request.ok) {
            console.log(`deck ${deckId} ${status}`)
            store.dispatch({ type: FETCH_USER_DECKS })
          } else {
            throw response
          }
        } catch (error) {
          console.log('no deck for you!')
          store.dispatch({ type: SET_ERROR, message: error })
        }
      }
      createDeck()
      break
    }

    case DELETE_DECK: {
      const deckToBeDeleted = {
        id: action.deckId
      }
      const options =
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify(deckToBeDeleted)
      }
      const deleteDeck = async () => {
        try {
          const request = await fetch(`${back}/deck/${action.deckId}`, options)
          const response = await request.json()
          console.log(request.ok)
          if (request.ok) {
            console.log(`deck supprim??: ${response}`)
            store.dispatch({ type: SET_LAST_ACTION, lastAction: DELETE_DECK })
          }
          store.dispatch({ type: FETCH_USER_DECKS })
        } catch (error) { console.log(error) }
      }
      deleteDeck()
      break
    }
    default:
      next(action)
  }
}

export default api
