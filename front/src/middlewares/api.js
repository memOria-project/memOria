import {
    getAllDecks, FETCH_DECKS, FETCH_CARDS, getCurrentDeckContent
  } from '../actions';
  
  
const api = (store) => (next) => (action) => {
    const token = localStorage.getItem("token");

    switch (action.type) {
      case FETCH_DECKS:
        {
        const back = store.getState().back;
        const options = 
        {
               method: 'GET', 
        }
        const getDecks = async () => {
            try{
            const request = await fetch(`${back}/decks`, options)
            const response = await request.json()
            store.dispatch(getAllDecks(response))
            } catch(error) { console.log(error)}

        }
        getDecks();
        next(action);
        break;
        }

      case FETCH_CARDS:
        {
        const back = store.getState().back;
        const { currentDeckId } = store.getState().currentDeck;
        const fetchCardsOptions = 
        {
               method: 'GET', 
        }
        const getCurrentDeck = async () => {
          try{
          const request = await fetch(`${back}/deck/${currentDeckId}/cards`, fetchCardsOptions)
          const response = await request.json()
          console.log(response)
          store.dispatch(getCurrentDeckContent(response))
          } catch(error) { console.log(error)}

      }
        getCurrentDeck(); 
        next(action);
        break;
      }

      default:
        next(action);
    }
  };

  export default api; 