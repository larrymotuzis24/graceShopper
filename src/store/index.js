import { createStore, combineReducers, applyMiddleware } from 'redux';
import auth from './auth';
import cart from './cart';
import books from './books';
import view from './view';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import states from './states';
import categories from './categories';
import users from './users';
import reviews from './reviews';
import wishList from './wishList';
import orders from './orders';
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducer = combineReducers({
  auth,
  cart,
  books, 
  view,
  states,
  categories,
  users,
  reviews,
  wishList,
  orders,
  toastr: toastrReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;
export * from './auth';
export * from './cart';
export * from './books';
export * from './states';
export * from './categories';
export * from './users';
export * from './reviews';
export * from './wishList';
export * from './orders';