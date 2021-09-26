import { ADMIN } from '../actions';
import { DISCONNECT } from '../actions';

<<<<<<< HEAD
const initialState = {  name: false};
=======
const initialState = {
    isConnected: false,
    name: "",
    password:"",
};
>>>>>>> 7df1c0e8f9c00e90ebfefcf6f74eec78b760f229

//Handle actions on authentication
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADMIN:
<<<<<<< HEAD
      return { name:"Administrateur"};

    case DISCONNECT:
      return {name: false};
=======
      return {...state,
        isConnected: true,
        name: "Administrateur",
      };

    case DISCONNECT:
      return {...state,
        isConnected: false,
    };
>>>>>>> 7df1c0e8f9c00e90ebfefcf6f74eec78b760f229

    default:
      return state;
  }
};

export default reducer;