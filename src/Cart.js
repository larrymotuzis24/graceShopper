import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateLineItem, deleteLineItem } from "./store";

const Cart = ({ cart, auth, updateLineItem, deleteLineItem }) => {

  const qtyZero = 0;

  return (
    <div id="cart-page">
      {auth.id ? (
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
      ) : null}
      <div id="shopping-cart">
        <h2>Shopping Cart</h2>
        <hr />
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
                      Only {lineItem.product.inventory} left in Stock - Order
                      soon.
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
                  onChange={(ev) => updateLineItem(lineItem.product, ev.target.value)}
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
                <Link to="/cart" onClick={() => deleteLineItem(lineItem.product, qtyZero)}>
                  Delete
                </Link>
              </div>
              <div id="div-price-product">
                <h5>${lineItem.product.price}</h5>
              </div>
            </main>
          );
        })}
        <hr />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, {history}) => {
  
  return {
    updateLineItem: (book, quantity) => dispatch(updateLineItem(book, quantity, history)),
    deleteLineItem: (book, qtyZero) => dispatch(deleteLineItem(book, qtyZero, history)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Cart);
