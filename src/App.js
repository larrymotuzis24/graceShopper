import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  fetchCart,
  exchangeToken,
  logout,
  fetchBooks,
  fetchStates,
  fetchCategories,
  fetchWishList,
} from './store';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import NavBar from './NavBar';
import User from './User';
import Books from './Books';
import SignIn from './SignIn';
import UserEdit from './UserEdit';
import UserEditPwd from './UserEditPwd';
import Book from './Book';
import Footer from './Footer';
import Order from './Order';
import UserAddress from './UserAddress';
import OrderHistory from './OrderHistory';

import IsAdminPanel from './IsAdminPanel';
import WishList from './WishList';
import './scss/app.scss';

import ConfirmationPage from './ConfirmationPage';


class App extends React.Component {
  componentDidMount(prevProps) {
    window.addEventListener('hashchange', () => {
      this.props.setView(window.location.hash.slice(1));
    });
    this.props.exchangeToken();
    this.props.fetchBooks();
    this.props.fetchStates();
    this.props.fetchCategories();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.fetchCart();
      this.props.fetchWishList(this.props.auth);
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <main>
        <Route path="/:view?" component={NavBar} />
        <Route path="/" exact component={Home} />
        {auth.id ? (
          <Fragment>
            <Route path="/cart" component={Cart} />
            <Route path="/wishList" component={WishList} />
            <Route path="/user" component={User} />
            <Route path="/editUser" component={UserEdit} />
            <Route path="/passwordUser" component={UserEditPwd} />
            <Route path="/addressUser" component={UserAddress} />
            <Route exact path="/books" component={Books} />
            <Route path="/orderHistory" component={OrderHistory} />
            <Route path="/confirmation" component={ConfirmationPage } />
            {auth.isAdmin ? (
              <Route path="/adminPriveldges" component={IsAdminPanel} />
            ) : null}
            <Route path="/books/page/:id" component={Books} />
            <Route exact path="/books/:id" component={Book} />
            <Route path="/order" component={Order} />
          </Fragment>
        ) : (
          <Fragment>
            <Switch>
              <Route path="/signIn" component={SignIn} />
            </Switch>
          </Fragment>
        )}
        {!auth.id ? (
          <Fragment>
            <Route exact path="/books" component={Books} />
            <Route path="/books/page/:id" component={Books} />
            <Route exact path="/books/:id" component={Book} />
            <Route path="/cart" component={Cart} />
          </Fragment>
        ) : null}
        <Footer />
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
    fetchStates: () => dispatch(fetchStates()),
    fetchCategories: () => dispatch(fetchCategories()),
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),

    fetchWishList: (user) => dispatch(fetchWishList(user)),
    setView: (view) => {
      dispatch({ type: 'SET_VIEW', view });
    },
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
