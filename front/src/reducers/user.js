import { ADMIN } from '../actions';
import { DISCONNECT } from '../actions';

const initialState = {  name: false};

//Handle actions on authentication
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN:
      return { name:"Administrateur"};

    case DISCONNECT:
      return {name: false};

    default:
      return state;
  }
};

export default reducer;