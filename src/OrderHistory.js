import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from './store';
import WriteReview from './WriteReview';
import { FaClipboardList } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.auth);
  }

  render() {
    const { orders, auth, subTotal } = this.props;
    const orderTotal = subTotal.map((subT) => {
      const shipTotal = subT * 0.02;
      const taxCol = subT * 0.081;
      return subT + shipTotal + taxCol;
    });
    return (
      <div id="" style={{}} className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          {orders.length > 0 ? (
            <div className="w-100">
              <h2 className="mb-4" style={{}}>
                Order History
              </h2>
              {/* <hr /> */}
            </div>
          ) : null}
        </div>
        <div style={{}}>
          <div id="">
            <div id="" style={{}}>
              {orders.length > 0 ? (
                orders.map((order, idx) => {
                  return (
                    <div key={order.id}>
                      <hr />
                      <div className="d-flex justify-content-between w-100">
                        <div
                          className="d-flex mt-2 me-3 w-25"
                          style={{ borderRight: '1px solid black' }}
                        >
                          <div className="me-3 text-secondary">
                            <p className="">Date</p>
                            <p className="">Total</p>
                          </div>
                          <div>
                            <p>
                              {`${new Date(order.updatedAt).toLocaleString(
                                'default',
                                {
                                  month: 'long',
                                }
                              )} ${new Date(
                                order.updatedAt
                              ).getDate()}, ${new Date(
                                order.updatedAt
                              ).getFullYear()}`}
                            </p>
                            <p>${orderTotal[idx].toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="w-75 order-history-books-container">
                          {order.lineItems.map((lineItem) => {
                            return (
                              <div key={lineItem.id} className="">
                                <div className="d-flex justify-content-between my-3">
                                  <div className="d-flex w-50">
                                    <img
                                      src={lineItem.product.imageUrl}
                                      style={{ width: '6rem' }}
                                      className="me-4"
                                    ></img>
                                    <p>
                                      {lineItem.product.title}
                                      <br />
                                      {lineItem.product.author}
                                      <br />${lineItem.product.price}
                                    </p>
                                  </div>
                                  <div className="text-end">
                                    <a
                                      to={`/books/${lineItem.productId}`}
                                      className="text-link"
                                      style-={{
                                        marginBottom: '2rem !important',
                                        display: 'block',
                                      }}
                                    >
                                      BUY IT AGAIN
                                    </a>
                                    <WriteReview order={lineItem.product} />
                                  </div>
                                </div>
                                <hr />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })
              ) : (
                <div className="container h-75" style={{}}>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <FaClipboardList size={180} />
                    <h3 className="d-block mt-4 mb-5">
                      You haven't placed any orders yet
                    </h3>
                    <a type="button" className="btn btn-dark" href="#books">
                      BROWSE BOOKS
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      // <div id='block-order-history-page'>
      //     <h2 className='order-history-title'>Order History</h2>
      //     <div id="order-history-page">
      //         <div id="order-history">
      //             <hr/>
      //             { orders.length > 0 ?
      //                 orders.map((order, idx) => {
      //                     return (
      //                         <main id='display-order-history' key={order.id}>

      //                             <p>Order Placed: <span>{`${new Date(order.updatedAt).getMonth()+1}/${new Date(order.updatedAt).getDate()}/${new Date(order.updatedAt).getFullYear()}`}</span></p>
      //                             <p>Total: <span>{orderTotal[idx].toFixed(2)}</span></p>
      //                             {
      //                                 order.lineItems.map(lineItem => {
      //                                     return (
      //                                         <div key={lineItem.id} id="display-line-item-order">
      //                                             <div className='order-book-info'>
      //                                                 <img
      //                                                 src={lineItem.product.imageUrl}
      //                                                 id="display-photo-line-item-order"
      //                                                 >
      //                                                 </img>
      //                                                 <h5>{lineItem.product.title}</h5>
      //                                             </div>
      //                                             <div className='order-history-button'>
      //                                                 <Link to={`/books/${lineItem.productId}`}><Button>Buy it again</Button></Link>
      //                                                 <WriteReview order={lineItem.product} />
      //                                             </div>

      //                                         </div>
      //                                     )
      //                                 })
      //                             }
      //                             <hr/>
      //                         </main>
      //                     )
      //                 }) :
      //                     <div >
      //                          <div style= {{ height: '200px', width: '87vw', marginBottom: '42px'}} >
      //                                 <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '150px' }}>
      //                                     <div>
      //                                         <FaClipboardList size={180}/>
      //                                                 <h3>No order history </h3>
      //                                          </div>
      //                                 </div>
      //                         </div>
      //                     </div>
      //             }
      //         </div>
      //     </div>

      // </div>
    );
  }
}

const mapStateToProps = ({ orders, auth }) => {
  const subTotal = orders.map((lineItem) => {
    return lineItem.lineItems.reduce((accum, item) => {
      const qty = item.quantity;
      accum += qty * item.product.price;
      return accum;
    }, 0);
  });

  return {
    orders,
    auth,
    subTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (user) => dispatch(fetchOrders(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
