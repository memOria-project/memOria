import {
  getAllDecks, FETCH_DECKS, FETCH_CARDS, getCurrentDeckContent, POST_CARD
} from '../actions'

const api = (store) => (next) => (action) => {
  const token = localStorage.getItem('token')
  const back = store.getState().back

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
      const { currentDeckId } = store.getState().currentDeck
      const fetchCardsOptions =
      {
        method: 'GET'
      }
      const getCurrentDeck = async () => {
        try {
          const request = await fetch(`${back}/deck/${currentDeckId}/cards`, fetchCardsOptions)
          const response = await request.json()
          console.log(response)
          store.dispatch(getCurrentDeckContent(response))
        } catch (error) { console.log(error) }
      }
      getCurrentDeck()
      next(action)
      break
    }
    case POST_CARD: {
      const { id } = store.getState().user
      const { currentCard } = store.getState().card
      let { recto, verso, currentDeckId, currentCardId } = currentCard
      const deckId = currentDeckId

      const newCard = {
        recto,
        verso,
        deckId
        // currentCardId
      }
      const options =
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token },
        body: JSON.stringify(newCard)
      }
      console.log(JSON.stringify(newCard));
      const postCard = async () => {
        try {
          const request = await fetch(`${back}/card`, options)
          const response = await request.json()
          console.log(response)
        } catch (error) { console.log(error) }
      }
      postCard()
      next(action)
      break
    }

    default:
      next(action)
  }
}

export default api
