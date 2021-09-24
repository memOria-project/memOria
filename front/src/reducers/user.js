import { ADMIN } from '../actions';
import { DISCONNECT } from '../actions';

const initialState = false;

//Handle actions on authentication
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN:
      return "Administrateur";

    case DISCONNECT:
      return false;

    default:
      return state;
  }
};

export default reducer;