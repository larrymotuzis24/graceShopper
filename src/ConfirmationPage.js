import React, {Component} from "react";
import { connect } from 'react-redux';
import { fetchOrders} from './store'
class ConfirmationPage extends Component{ 
  constructor(){
    super();
    this.state = {
      orders:[], 
      lastOrder: {}
    }
  };
  componentDidMount(){
    this.props.fetchOrders(this.props.auth)
    console.log('orders' , this.props.orders)
    

  }
  componentDidUpdate(previousProps){
    if(previousProps.orders.length === 0 && this.props.orders.length > 0 ){
      this.setState({orders: this.props.orders, lastOrder: this.props.orders[this.props.orders.length -1 ] } )
    }
  }
  render() {
   
    const { auth, orders } = this.props;
    const  lastOrder  = this.state.lastOrder
  
   
    return (
        <div>
        <h1> {auth.firstName},  Your order is being prepared </h1>
        <div id="order-history-page">
        <div id="order-history">
        <main id='display-order-history'>
        {
          lastOrder.lineItems ? lastOrder.lineItems.map(lineItem => {
            return (
              <div key={lineItem.id} id="display-line-item-order">
              <div className='order-book-info'>
                  <img
                  src={lineItem.product.imageUrl}
                  id="display-photo-line-item-order"
                  >
                  </img>
                  <h5>{lineItem.product.title}</h5>
              </div>
              
          </div>
            )
          }) :
          null
        }
        </main>
        <p> <span>Please check email for confirmation, send to : </span> {auth.email} </p>
        </div>
        </div>
        </div>
    )
  }
};


const mapStateToProps = ({orders, auth}) =>{
  return {
      orders,
      auth
  };
}

const mapDispatchToProps = (dispatch) =>{
  return {
      fetchOrders: (user) => dispatch(fetchOrders(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);