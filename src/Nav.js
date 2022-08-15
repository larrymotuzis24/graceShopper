import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import SignIn from "./SignIn";
import { logout } from "./store";

const Nav = ({auth, cart, logout}) => {
    
    return (
        <div>
            <nav>
                <Link to={'/'}> Grace Shopper </Link>
                <Link to={'/books'}> Books </Link>
                {
                    auth.id ? <Link to={'/user'}> My Account </Link> : <Link to={'/signIn'}> Sing In </Link> 
                } 
                {
                    auth.id ? <Link to='/cart'>Cart ({cart.lineItems.length})</Link>: null
                }
                {
                     auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: <SignIn /> 
                }
            </nav>
          
        </div>
      
    )
};

const mapDispatch = (dispatch)=> {
    return {
      logout: ()=> dispatch(logout())
    };
};

const mapStateToProps = (state)=> {
    return state;
  };

  export default connect(mapStateToProps, mapDispatch)(Nav);