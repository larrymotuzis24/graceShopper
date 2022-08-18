import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import { logout } from "./store";
import SearchBar from "./SearchBar";

const Nav = (props) => {
    
    const { auth, cart, logout, match, books } = props;
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
          Cart ({cart.lineItems.length})
        </Link>

        {auth.id ? (
          <Link to="/user" className={ view === 'user' ? 'selected': ''}> My Account </Link>
        ) : (
          <Link to="/signIn" className={ view === 'signIn' ? 'selected': ''}> Sign In </Link>
        )}

        {auth.id ? (
          <button onClick={logout}><Link to='/'>Log Out </Link></button>
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
