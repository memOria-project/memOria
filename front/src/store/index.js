import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import api from '../middlewares/api';
// Ici, on référence tous les middleware à utiliser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [api];
const enhancers = composeEnhancers(
  applyMiddleware(...middlewares),
);

const store = createStore(
  reducer,
  enhancers,
);

export default store;