import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchBooks } from './store';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Nav from './Nav';
import User from './User';
import Books from './Books';
import SignIn from './SignIn';

class App extends React.Component {
  componentDidMount() {
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    })
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
       <Nav />
      <Home /> 
        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
              <Route path='/user' component={ User } />
            </Fragment>
          ) :
          <Fragment>
            <Switch>
              <Route path='/signIn' component={ SignIn }/>
            </Switch>
          </Fragment>
        }
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
    setView: ( view ) => {
      dispatch({ type:'SET_VIEW', view})
  }
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
