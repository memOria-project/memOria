import { DISCONNECT, UPDATE_LOGIN, UPDATE_USER } from '../actions'

const initialState = {
  isConnected: false,
  name: '',
  email: '',
  password: ''
}

//Handle actions on authentication

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case ADMIN:
    //   return {name: 'Administrateur',
    //     token: false
    //   }

    case DISCONNECT:
      return {
        ...state,
        isConnected: false,
        name:'',
        email:''
      }

    case UPDATE_LOGIN:
      return {...state,
      [action.field]: action.value
      }

    case UPDATE_USER:
      const {name, email} = action
      return {...state,
      password:'',
      name,
      email,
      isConnected:true

    }
    default:
      return state;
  }
};

export default reducer;