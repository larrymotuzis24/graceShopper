import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import SignIn from "./SignIn";
import { logout } from "./store";

const Nav = ({auth, cart, logout}) => {
    console.log('cart in NAV ' , cart)
    return (
        <div>
            <nav>
                <Link to={'/'}> Grace Shopper </Link>
                <Link to={'/books'}> Books </Link>
                <Link to={'/cart'} >Cart ({cart.lineItems.length}) </Link>
    
                {
                    auth.id ? <Link to={'/user'}> My Account </Link> : <Link to={'/signIn'}> Sing In </Link> 
                } 
               
                {
                     auth.id ? <button onClick={ logout }>Logout { auth.username }</button>: null 
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