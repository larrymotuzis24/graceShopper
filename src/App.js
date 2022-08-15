import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchBooks } from './store';
import { Link, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Cart from './Cart';
import Home from './Home';
import User from './User';

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
        <h1>Grace Shopper</h1>
        {
          auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignIn />
        }
        {
          auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
        }
        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
              <Route path='/user' component={ User } />
            </Fragment>
          ): null 
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
