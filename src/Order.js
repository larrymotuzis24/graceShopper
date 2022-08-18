import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLineItem, deleteLineItem } from "./store";
import { Link } from "react-router-dom";


class Order extends Component {
  render() {
    const { auth, cart, updateLineItem, deleteLineItem, subTotal, totalQty } =
      this.props;
    const qtyZero = 0;
    const shippingTotal = subTotal * 0.02;
    const beforeTax = subTotal + shippingTotal;
    const taxCollected = subTotal * 0.081;
    const orderTotal = subTotal + shippingTotal + taxCollected;
    cart.lineItems.sort((a, b) => {
      return a.id - b.id;
    });
    return (
      <div id="order-page">
        {auth.id ? (
          <h2 className="user-name">
            Welcome, {auth.firstName} {auth.lastName}!
          </h2>
        ) : null}
        <h2 className="checkout-title">Checkout ({totalQty} items)</h2>
        <main id="order-info">
          <div id="order-info-div">
            <div id="shipping-info">
              <h3>Shipping Address</h3>
              <div>
                <p>
                  {auth.firstName} {auth.lastName}
                </p>
                <p>{auth.address.toUpperCase()}</p>
              </div>
            </div>
            <hr />
            <div id="payment-info">
              <h3>Payment Method</h3>
            </div>
            <hr />
            <div id="review-order">
              <h3>Review Order</h3>
              <div>
                {cart.lineItems.map((lineItem) => {
                  return (
                    <main id="display-lineitem" key={lineItem.id}>
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
                          <span>Quantity</span>{" "}
                        </p>
                        <select
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
                          onClick={() =>
                            deleteLineItem(lineItem.product, qtyZero)
                          }
                        >
                          Delete
                        </Link>
                      </div>
                      <div id="div-price-product">
                        <h5>Price</h5>
                        <h5>${lineItem.product.price}</h5>
                      </div>
                    </main>
                  );
                })}
              </div>
              <hr />
            </div>
          </div>
          <div>
            <div id="total-line-items">
              <p>
                <span>({totalQty} items): </span>
                <span>${subTotal.toFixed(2)}</span>
              </p>
              <p>
                  <span>Shipping: </span>
                  <span>${shippingTotal.toFixed(2)}</span>
              </p>
              <p>
                  <span>Total before tax: </span>
                  <span>${beforeTax.toFixed(2)}</span>
              </p>
              <p>
                  <span>Tax to be collected: </span>
                  <span>${taxCollected.toFixed(2)}</span>
              </p>
              <p>
                  <span id="total-text">Order total: </span>
                  <span id="total-amount">${orderTotal.toFixed(2)}</span>
              </p>
              <button>
                <Link to="/order">Checkout</Link>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

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
    updateLineItem: (book, quantity) =>
      dispatch(updateLineItem(book, quantity, history)),
    deleteLineItem: (book, qtyZero) =>
      dispatch(deleteLineItem(book, qtyZero, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
