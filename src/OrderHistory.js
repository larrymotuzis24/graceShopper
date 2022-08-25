import React, {Component} from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from './store';
import WriteReview from './WriteReview';
import {
    FaClipboardList
} from 'react-icons/fa'
import { Button } from 'react-bootstrap'

class OrderHistory extends Component{
    
    componentDidMount(){
        this.props.fetchOrders(this.props.auth);
    }

    render(){

        const { orders, auth, subTotal } = this.props;
        const orderTotal = subTotal.map(subT => {
            const shipTotal = subT * 0.02;
            const taxCol = subT * 0.081;
            return subT + shipTotal + taxCol
        });
        return (
            <div id='block-order-history-page'>
                <h2 className='order-history-title'>Order History</h2>
                <div id="order-history-page">
                    <div id="order-history">
                        <hr/>
                        { orders.length > 0 ?
                            orders.map((order, idx) => {
                                return (
                                    <main id='display-order-history' key={order.id}>
                                        
                                        <p>Order Placed: <span>{`${new Date(order.updatedAt).getMonth()+1}/${new Date(order.updatedAt).getDate()}/${new Date(order.updatedAt).getFullYear()}`}</span></p>
                                        <p>Total: <span>{orderTotal[idx].toFixed(2)}</span></p>
                                        {
                                            order.lineItems.map(lineItem => {
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
                                                        <div className='order-history-button'>
                                                            <Link to={`/books/${lineItem.productId}`}><button>Buy it again</button></Link>
                                                            <WriteReview order={lineItem.product} />
                                                        </div>
                                                        
                                                    </div>
                                                )
                                            })
                                        }
                                        <hr/>
                                    </main>
                                )
                            }) : 
                                <div >
                                     <div style= {{ height: '200px', width: '87vw', marginBottom: '42px'}} > 
                                            <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
                                                <div>
                                                    <FaClipboardList size={180}/>   
                                                            <h3>No order history </h3>
                                                     </div>
                                            </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                
            </div>
        )
    }
    
}

const mapStateToProps = ({orders, auth}) =>{
    const subTotal = orders.map(lineItem =>{
        return lineItem.lineItems.reduce((accum, item) =>{
            const qty = item.quantity;
            accum += qty * item.product.price;
            return accum
        }, 0)
    });
    
    return {
        orders,
        auth,
        subTotal
    };
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchOrders: (user) => dispatch(fetchOrders(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);