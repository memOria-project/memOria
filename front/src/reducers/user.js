import { ADMIN } from '../actions';
import { DISCONNECT } from '../actions';

const initialState = {name: false,
                      token: false
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

    default:
      return state;
  }
};

export default reducer;