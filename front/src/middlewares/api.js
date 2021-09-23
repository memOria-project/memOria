import {
    getAllDecks, GET_DECKS,
  } from '../actions/';
  
  
const api = (store) => (next) => (action) => {
    switch (action.type) {
      case GET_DECKS:
        const back = store.getState("back")
        const getDecks = async () => {
            try{
            const request = await fetch(`${back}/decks`)
            const response = await request.json()
            store.dispatch(getAllDecks(response.data.decks))
            } catch(error) { console.log(error)}

        }
        getDecks();
        next(action);
        break;
      default:
        next(action);
    }
  };

  export default api; 