import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchBooks } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Cart from './Cart';
import Home from './Home';
import User from './User';
import Books from './Books';
import Nav from './Nav';

class App extends React.Component {
  componentDidMount() {
    this.props.exchangeToken();
    this.props.fetchBooks();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    const { auth, logout, cart, books } = this.props;
    return (
      <main>
        {auth.id ? <Nav /> : <SignIn />}
        {auth.id ? (
          <Fragment>
            <Route path="/cart" component={Cart} />
            <Route path="/user" component={User} />
          </Fragment>
        ) : null}
        <Route path="/books" component={Books} />
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    fetchBooks: () => dispatch(fetchBooks()),
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
