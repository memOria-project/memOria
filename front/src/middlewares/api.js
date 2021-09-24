import {
    getAllDecks, FETCH_DECKS, 
  } from '../actions';
  
  
const api = (store) => (next) => (action) => {
    switch (action.type) {
      case FETCH_DECKS:
        const back = store.getState().back;
        console.log(back);
        const options = 
        {
               method: 'GET',
        }
        const getDecks = async () => {
            try{
            const request = await fetch(`${back}/decks`, options)
            const response = await request.json()
            console.log(response);
            store.dispatch(getAllDecks(response))
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