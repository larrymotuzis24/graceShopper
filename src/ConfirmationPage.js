import React, {Component} from "react";
import { connect } from 'react-redux';
// import { fetchOrders} from './store'

class ConfirmationPage extends Component{ 

  render() {

    const { auth, cart} = this.props;
   
    return (
        <div>
        <h1> {auth.firstName},  Your order is being prepared </h1>
        <div id="order-history-page">
        <div id="order-history">
        <main id='display-order-history'>
        {
          cart.lineItems ? cart.lineItems.map(lineItem => {
            return (
              <div key={lineItem.id} id="display-line-item-order">
              <div className='order-book-info'>
                  <img
                  src={lineItem.product.imageUrl}
                  id="display-photo-line-item-order"
                  >
                  </img>
                  <h5>{lineItem.product.title}</h5>
                  <p> Quantity:{lineItem.quantity}</p>
              </div>
              
          </div>
            )
          }) :
          null
        }
        </main>
        <div className='order-book-info'>
        <p> <span> Confirmation send to : </span> {auth.email} </p>
        <p> Shipped to {auth.address}</p> 
        </div>
        </div>
        </div>
        </div>
    )
  }
};


const mapStateToProps = ({ auth, cart }) =>{
  return {
      auth,
      cart
  };
}

export default connect(mapStateToProps)(ConfirmationPage);