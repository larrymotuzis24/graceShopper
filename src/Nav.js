import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import { logout } from "./store";
import SearchBar from "./SearchBar";

const Nav = (props) => {
    
    const { auth, cart, logout, match } = props;
    const view = match.params.view;
  return (
      <nav id="nav-var">
        <h2>
          <Link to="/" className={ !view ? 'selected': ''}>
            Grace Shopper
          </Link>
        </h2>
        <Link to="/books" className={ view === 'books' ? 'selected': ''}>
          Books
        </Link>

        <Link to="/cart" className={ view === 'cart' ? 'selected': ''}>
          { auth.id ? `Cart (${cart.lineItems.length})` : !auth.id && localStorage.getItem('lineItem') ? `Cart (${JSON.parse(localStorage.getItem('lineItem')).length})` : 'Cart (0)'}
        </Link>

        {auth.id ? (
          <Link to="/user" className={ view === 'user' ? 'selected': ''}> My Account </Link>
        ) : (
          <Link to="/signIn" className={ view === 'signIn' ? 'selected': ''}> Sign In </Link>
        )}

        {auth.isAdmin ? (
          <Link to='/adminPriveldges'> Manage Users </Link>
        ) : null}

        {auth.id ? (
          <Link to='/' onClick={() => logout()}>Log Out </Link>
        ) : null}
      </nav>
  );
};

const mapDispatch = (dispatch, { history }) => {
  return {
    logout: () => dispatch(logout(history)),
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatch)(Nav);
