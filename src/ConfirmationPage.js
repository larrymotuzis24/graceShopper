import React from "react";
import { connect } from 'react-redux';

const ConfirmationPage = ({auth}) => {

    return (
        <div>
        <h1> {auth.firstName} Order is being prepared </h1>
    
        </div>
    )
};



const mapStateToProps = ({ auth, cart }) => {
    const subTotal = cart.lineItems.reduce((accum, lineItem) => {
      const qty = lineItem.quantity;
      accum += qty * lineItem.product.price;
      return accum;
    }, 0);
    const totalQty = cart.lineItems.reduce((accum, lineItem) => {
      accum += lineItem.quantity;
      return accum;
    }, 0);
    return {
      auth,
      cart,
      subTotal,
      totalQty,
    };
  };
  
  const mapDispatchToProps = (dispatch, { history }) => {
    return {
   
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
  