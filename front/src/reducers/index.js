import { combineReducers } from 'redux';

import decksReducer from './decks';
import backReducer from './back';
import userReducer from './user';
import cardReducer from './card';

const rootReducer = combineReducers({
  // ici, on indique que notre state aurra une tranche (slice) appelée
  // decks et que c'est le reducers decksReducer (défini dans le module ./decks)
  // qui en aura la charge
  // on accède à cette tranche du state par state.decks
  decks: decksReducer,
  back: backReducer,
  user: userReducer,
  card: cardReducer
});

export default rootReducer;