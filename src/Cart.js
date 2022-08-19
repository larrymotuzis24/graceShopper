import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateLineItem, deleteLineItem } from "./store";

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
  cart.lineItems.sort((a,b) => {
    return a.id - b.id
  })

  if(!auth.id && localStorage.getItem('lineItem')){
     subTotalGuest = JSON.parse(localStorage.getItem('lineItem')).reduce((accum, lineItem) => {
      const qty = lineItem.qty;
      accum += qty * lineItem.product.price;
      return accum;
    }, 0);
     totalQtyGuest = JSON.parse(localStorage.getItem('lineItem')).reduce((accum, lineItem) => {
      accum += lineItem.qty;
      return accum;
    }, 0);
  }

  return (
    <div id="block-cart-page">
      {auth.id ? (
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
      ) : null}
      <h2 className="cart-title">Shopping Cart</h2>
      <div id="cart-page">
        <div id="shopping-cart">
          
          <hr />
          {auth.id && cart.lineItems.length > 0 ? cart.lineItems.map((lineItem) => {
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
                    onChange={(ev) =>
                      updateLineItem(auth, lineItem.product, ev.target.value)
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
            );
          }) : !auth.id && localStorage.getItem('lineItem') ? JSON.parse(localStorage.getItem('lineItem')).map(lineItem => {
              
            return (
              <main id="display-lineitem" key={ lineItem.product.id }>
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
                    defaultValue={lineItem.qty}
                    onChange={(ev) =>
                      updateLineItem(auth, lineItem.product, ev.target.value)
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
            )
          }) : <p>No items added to your cart!</p>}
          <hr />
        </div>
        {
          auth.id && cart.lineItems.length > 0 ? <div id="subtotal-line-items">
          <p>
            <span>Subtotal ({totalQty} items): </span>
            <span>${subTotal.toFixed(2)}</span>
          </p>
          <button><Link to='/order'>Proceed to checkout</Link></button>
        </div> : !auth.id && localStorage.getItem('lineItem') ? <div id="subtotal-line-items">
          <p>
            <span>Subtotal ({totalQtyGuest} items): </span>
            <span>${subTotalGuest.toFixed(2)}</span>
          </p>
          <button><Link to='/signIn'>Login to checkout</Link></button>
        </div> : null
        }
        
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateLineItem: (auth, book, quantity) =>
      dispatch(updateLineItem(auth, book, quantity, history)),
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
