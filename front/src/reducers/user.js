import { ADMIN } from '../actions';
import { DISCONNECT } from '../actions';

const initialState = {
    isConnected: false,
    name: "",
    password:"",
};

//Handle actions on authentication
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN:
      return {...state,
        isConnected: true,
        name: "Administrateur",
      };

    case DISCONNECT:
      return {...state,
        isConnected: false,
    };

    default:
      return state;
  }
};

export default reducer;