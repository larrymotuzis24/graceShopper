import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchBooks } from './store';
import { Link, Route } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Nav from './Nav';
import User from './User';
import SignIn from './SignIn';


class App extends React.Component{
  componentDidMount(){
    this.props.exchangeToken();
    this.props.fetchBooks();
  }
  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){
    const { auth, logout, cart } = this.props;
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
          ):
          <Fragment>
            <Route path='/signIn' component={ SignIn }/>
          </Fragment>
        }
      </main>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchBooks: () => dispatch(fetchBooks())
  };
};
const mapStateToProps = (state)=> {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
