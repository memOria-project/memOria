import { ADMIN, DISCONNECT, UPDATE_LOGIN } from '../actions';

const initialState = {
    isConnected: false,
    name: "toto",
    email:"toto@s.fr",
    password:"123456",
};

//Handle actions on authentication
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN:
      return {name: "Administrateur",
        token: false
      };

    case DISCONNECT:
      return {name: false,
      token: false
    };

    case UPDATE_LOGIN:
      return {...state, 
      [action.field]: action.value
      }
    default:
      return state;
  }
};

export default reducer;