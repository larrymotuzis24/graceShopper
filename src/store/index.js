import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import books from './books';
import view from './view';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import states from './states';

const reducer = combineReducers({
  auth,
  cart,
  books, 
  view,
  states
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './books';
export * from './states';