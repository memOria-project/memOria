import { GET_DECKS } from '../../actions'

export const initialState = [
    {id:1, title:"javascript", created_at:1632302004, tag:"React"}, 
    {id:2, title:"HTML", created_at:1632302005, tag:"Elements"}, 
    {id:3, title:"CSS", created_at:16323020060, tag:"selectors"}
];

const reducer = (state = initialState, action = {}) => {
  // console.log('reducer recipes', state);
  // dans un reducer qui a été combiné, on n'accède qu'à sa tranche de state
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        decks: action.decks,
      };

    default:
      return state;
  }
};

export default reducer;