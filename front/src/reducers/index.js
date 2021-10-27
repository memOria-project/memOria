import { combineReducers } from 'redux'

import decksReducer from './decks'
import backReducer from './back'
import userReducer from './user'
import optionsReducer from './options'
import currentDeckReducer from './currentDeck'

const rootReducer = combineReducers({
  // ici, on indique que notre state aurra plusieurs tranches (slice), dont une appelée
  // decks qui sera géré par le reducer decksReducer (défini dans le module ./decks)
  // on accède à cette tranche du state par state.decks
  decks: decksReducer,
  back: backReducer,
  user: userReducer,
  options: optionsReducer,
  currentDeck: currentDeckReducer
})

export default rootReducer
