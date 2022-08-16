import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import SignIn from "./SignIn";
import { logout } from "./store";

const Nav = ({auth, cart, logout, view}) => {
    console.log(view)
    return (
        <div>
            <nav>
                <Link to={'/'} className={view === '/' ? 'selected': ''}> Grace Shopper </Link>
                <Link to={'/books' } className={view === '/books' ? 'selected': ''}> Books </Link>
                <Link to={'/cart'} className={view === '/cart' ? 'selected': ''} >Cart ({cart.lineItems.length}) </Link>
    
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