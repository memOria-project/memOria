import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

// Ici, on référence tous les middleware à utiliser
const middlewares = [];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;