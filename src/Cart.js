import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLineItem, deleteLineItem } from './store';
import { Button } from 'react-bootstrap'
import {
  BsFillTrashFill
} from 'react-icons/bs'
const Cart = ({
  cart,
  auth,
  subTotal,
  totalQty,
  updateLineItem,
  deleteLineItem,
}) => {
  const qtyZero = 0;
  let subTotalGuest = 0;
  let totalQtyGuest = 0;
  cart.lineItems.sort((a, b) => {
    return a.id - b.id;
  });

  if (!auth.id && localStorage.getItem('lineItem')) {
    subTotalGuest = JSON.parse(localStorage.getItem('lineItem')).reduce(
      (accum, lineItem) => {
        const qty = lineItem.qty;
        accum += qty * lineItem.product.price;
        return accum;
      },
      0
    );
    totalQtyGuest = JSON.parse(localStorage.getItem('lineItem')).reduce(
      (accum, lineItem) => {
        accum += lineItem.qty * 1;
        return accum;
      },
      0
    );
  }

  return (
    <div id="block-cart-page" style={{height: '85vh'}}>

      <div>
        <div style={{ display: 'inline-block', height: '16vh', marginLeft: '26%'}}>
          <h2 className="cart-title" style={{
            textAlign: 'left',
            marginLeft: '10%'}}>Cart</h2>
        </div>
        <div style={{ display: 'inline-block', width: '10vw', marginLeft: '32%'}}>
          {auth.id && cart.lineItems.length > 0 && cart.isCart ? (
              <div style={{
                display: 'flex'
              }}>
                {/*
                  we can move this downward to fit the new design
                <p>
                  <span>Subtotal ({totalQty} items): </span>
                  <span>${subTotal.toFixed(2)}</span>
                </p> */}
                <Button style={{marginLeft: '16px'}}>
                  <Link to="/order">Proceed to checkout</Link>
                </Button>
                <Button style={{marginLeft: '16px'}}>
                  <Link to="/">Go Back</Link>
                </Button>
              </div>
            ) : !auth.id && localStorage.getItem('lineItem') ? (
              <div id="subtotal-line-items">
                <p>
                  <span>Subtotal ({totalQtyGuest} items): </span>
                  <span>${subTotalGuest.toFixed(2)}</span>
                </p>
                <button>
                  <Link to="/signIn">Login to checkout</Link>
                </button>
              </div>
            ) : null}
            </div>
        </div>
      <div id="cart-page" style={{marginTop: '-9vh'}}>
        <div id="shopping-cart" style={{ borderTop: '1px solid'}}>
          {auth.id && cart.lineItems.length > 0 && cart.isCart ? (
            cart.lineItems.map((lineItem) => {
              return (
                <main id="display-lineitem" key={lineItem.id}  style={{ borderBottom: '1px solid black'}}>
                  <img
                    src={lineItem.product.imageUrl}
                    id="display-photo-lineitem"
                  ></img>
                  <div id="div-info-line-item">
                    <h5>{lineItem.product.title}</h5>
                    <p>
                      <span>Author:</span> {lineItem.product.author}
                    </p>
                    <p>
                      {lineItem.product.inventory >= 1 &&
                      lineItem.product.inventory <= 10 ? (
                        <span id="stock-left">
                          Only {lineItem.product.inventory} left in Stock -
                          Order soon.
                        </span>
                      ) : lineItem.product.inventory > 10 ? (
                        <span id="in-stock">In Stock</span>
                      ) : (
                        <span id="out-stock">Out of Stock</span>
                      )}
                    </p>
                    <div>
                      <div style={{display: 'flex'}}>
                      {/* marginLeft: '366%' */}
                          <p style={{marginRight: '10px'}}>
                            <span>Quantity</span>{' '}
                          </p>
                          <select

                            style={{height: '26px', marginRight: '10px'}}
                            defaultValue={lineItem.quantity}
                            onChange={(ev) =>
                              updateLineItem(lineItem.product, ev.target.value)
                            }
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                          <Link
                            to="/cart"
                            onClick={() => deleteLineItem(lineItem.product, qtyZero)}
                          >
                           <BsFillTrashFill size={25} />
                          </Link>
                      </div>
                    </div>
                  </div>
                  <div id="div-price-product" style={{marginLeft: '53%'}}>
                    <h5>Price</h5>
                    <h5>${lineItem.product.price}</h5>
                  </div>
                </main>
              );
            })
          ) : !auth.id && localStorage.getItem('lineItem') ? (
            JSON.parse(localStorage.getItem('lineItem')).map((lineItem) => {
              return (
                <div>
                <main id="display-lineitem" key={lineItem.product.id} >
                  <img
                    src={lineItem.product.imageUrl}
                    id="display-photo-lineitem"
                  ></img>
                  <div id="div-info-line-item">
                    <h5>{lineItem.product.title}</h5>
                    <p>
                      <span>Author:</span> {lineItem.product.author}
                    </p>
                    <p>
                      {lineItem.product.inventory >= 1 &&
                      lineItem.product.inventory <= 10 ? (
                        <span id="stock-left">
                          Only {lineItem.product.inventory} left in Stock -
                          Order soon.
                        </span>
                      ) : lineItem.product.inventory > 10 ? (
                        <span id="in-stock">In Stock</span>
                      ) : (
                        <span id="out-stock">Out of Stock</span>
                      )}
                    </p>
                    <p>
                      <span>Quantity</span>{' '}
                    </p>
                    <select
                      defaultValue={lineItem.qty}
                      onChange={(ev) =>
                        updateLineItem(lineItem.product, ev.target.value)
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                    <Link
                      to="/cart"
                      onClick={() => deleteLineItem(lineItem.product, qtyZero)}
                    >
                      Delete
                    </Link>
                  </div>
                  <div id="div-price-product">
                    <h5>Price</h5>
                    <h5>${lineItem.product.price}</h5>
                  </div>
                </main>
                </div>
              );
            })
          ) : (
            <p>No items added to your cart!</p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateLineItem: (book, quantity) =>
      dispatch(updateLineItem(book, quantity, history)),
    deleteLineItem: (book, qtyZero) =>
      dispatch(deleteLineItem(book, qtyZero, history)),
  };
};

const mapStateToProps = ({ cart, auth }) => {
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
    cart,
    auth,
    subTotal,
    totalQty,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
