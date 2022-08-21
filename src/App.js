import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart, exchangeToken, logout, fetchBooks, fetchStates } from './store';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import Nav from './Nav';
import User from './User';
import Books from './Books';
import SignIn from './SignIn';
import UserEdit from './UserEdit';
import UserEditPwd from './UserEditPwd';
import Book from './Book';
import Order from './Order';
import UserAddress from './UserAddress';
import IsAdminPanel from './IsAdminPanel'


class App extends React.Component {
  componentDidMount() {
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    })
    this.props.exchangeToken();
    this.props.fetchBooks();
    this.props.fetchStates();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    const { auth } = this.props;
    return (
      <main>
       <Route path='/:view?' component={ Nav} />
       <Route path='/' exact component={ Home }/>
        {
          auth.id ? (
            <Fragment>
              <Route path='/cart' component={ Cart } />
              <Route path='/user' component={ User } />
              <Route path='/editUser' component={ UserEdit} />
              <Route path='/passwordUser' component={ UserEditPwd } />
              <Route path='/addressUser' component={ UserAddress } />
              <Route exact path="/books" component={ Books } />
              {auth.isAdmin ? <Route exact='/manage/users' component={IsAdminPanel} /> : null } 
              <Route path="/books/page/:id" component={ Books } />
              <Route exact path="/books/:id" component={ Book } />
              <Route path="/order" component={ Order } />
            </Fragment>
          ) :
          <Fragment>
            <Switch>
              <Route path='/signIn' component={ SignIn }/>
            </Switch>
          </Fragment>
        }
        {
          !auth.id ? 
          (<Fragment>
            <Route exact path="/books" component={ Books } />
            <Route path="/books/page/:id" component={ Books } />
            <Route exact path="/books/:id" component={ Book } />
            <Route path='/cart' component={ Cart } />
          </Fragment>): null
        }
        
        
      </main>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchBooks: () => dispatch(fetchBooks()),
    fetchStates: () => dispatch(fetchStates()),
    exchangeToken: () => dispatch(exchangeToken()),
    logout: () => dispatch(logout()),
    fetchCart: () => dispatch(fetchCart()),
    setView: ( view ) => {
      dispatch({ type:'SET_VIEW', view})
    }
  };
};
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);
