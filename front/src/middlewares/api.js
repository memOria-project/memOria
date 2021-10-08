import {
  getAllDecks, FETCH_DECKS, FETCH_CARDS, getCurrentDeckContent, POST_CARD, EDIT_CURRENT_DECK, DELETE_CARD, DELAY_CARD, CREATE_DECK, CHECK_TOKEN
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
      // const { id } = store.getState().user
      const { currentCard } = store.getState().card
      let { recto, verso, currentDeckId, currentCardId } = currentCard
      const deckId = currentDeckId
      // const id = currentCardId
      const newCard = {
        recto,
        verso,
        deckId,
        id: action.cardId
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
          const response = await request.status
          console.log(response)
          if (response === 200 || response === 201) {
            store.dispatch({type:EDIT_CURRENT_DECK, isModified: true})
          }
          else {
            store.dispatch({type:EDIT_CURRENT_DECK, isModified: false})
          }
          console.log(response)
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
          'Authorization': token },
        body: JSON.stringify(cardToBeDeleted)
      }
      console.log(JSON.stringify(cardToBeDeleted))
      const deleteCard = async() => {
        try{
          const request = await fetch(`${back}/card`, options)
          const response = await request.status
          if(response === 200){
            console.log(`carte supprimée: ${response}`)
          }
          store.dispatch({type:FETCH_CARDS})
        }catch(error) { console.log(error)}
      }
      deleteCard()
      break
    }
    case DELAY_CARD: {
      const cardToBeDelayed = {
        id: action.id
      }
      const options = 
      {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token },
          body: JSON.stringify(cardToBeDelayed)
      }
      const delayCard = async () => {
        try {
          const request = await fetch(`${back}/card/delay`, options)
          const response = await request.json()
          console.log(response)
        } catch (error) { console.log(error)}
      }
      delayCard();
      break
    }

    case CREATE_DECK: {
      const {name, tags} = action.data;
      const newDeck = {
        name,
        tag: [tags]
      }
      const options = 
      {
        method:'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token },
        body: JSON.stringify(newDeck)
        }
        console.log(options.body)

      const createDeck = async () => {
        try {
          const request = await fetch(`${back}/deck/new`, options)
          const response = await request
          console.log(response)
          if(response.status === 200){
          dispatch({type:CHECK_TOKEN})
          }
          else{
            console.log("no deck for you")
          }
        } catch (error) { console.log(error)}
      }
      createDeck()

    }
    default:
      next(action)
  }
}

export default api
