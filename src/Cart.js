import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateLineItem, deleteLineItem } from "./store";

import { Button } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import { GiBookshelf } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';

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

  if (!auth.id && localStorage.getItem("lineItem")) {
    subTotalGuest = JSON.parse(localStorage.getItem("lineItem")).reduce(
      (accum, lineItem) => {
        const qty = lineItem.qty;
        accum += qty * lineItem.product.price;
        return accum;
      },
      0
    );
    totalQtyGuest = JSON.parse(localStorage.getItem("lineItem")).reduce(
      (accum, lineItem) => {
        accum += lineItem.qty * 1;
        return accum;
      },
      0
    );
  }

  return (
    <div id="" style={{}} className="container">
      {/* Cart page heading */}
      <div
        id=""
        className="d-flex justify-content-between align-items-end my-4"
      >
        {auth.id && cart.lineItems.length > 0 && cart.isCart ? (
          <h2 className="" style={{}}>
            Cart
          </h2>
        ) : <h2 className="" style={{}}>
        Cart
      </h2>}
        <div style={{}}>
          {auth.id && cart.lineItems.length > 0 && cart.isCart ? (
            <div style={{}}>
              <a
                type="button"
                className="btn btn-light border-dark"
                href="#books"
                style={{}}
              >
                CONTINUE BROWSING
              </a>
              <a
                type="button"
                className="btn btn-dark ms-4"
                href="#order"
                style={{}}
              >
                CHECKOUT
              </a>
            </div>
          ) : !auth.id && localStorage.getItem("lineItem") ? (
            <div id="subtotal-line-items" >
              
              <button className="btn btn-dark ms-4" >
                <Link to="/signIn">Login to checkout</Link>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* Cart page body */}
      <div id="" style={{}} className="container">
        <div
          id=""
          style={{
            borderTop:
              auth.id && cart.lineItems.length > 0 && cart.isCart
                ? "1px solid"
                : null,
          }}
        >
          {auth.id && cart.lineItems.length > 0 && cart.isCart ? (
            cart.lineItems.map((lineItem) => {
              return (
                <main
                  id="display-lineitem"
                  key={lineItem.id}
                  style={{ borderBottom: "1px solid black" }}
                >
                  <img
                    src={lineItem.product.imageUrl}
                    id="display-photo-lineitem"


                    style={{ height: "250px" }}

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
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <p style={{ marginRight: "10px" }}>
                          <span>Quantity</span>{" "}
                        </p>
                        <select
                          style={{ height: "26px", marginRight: "10px" }}
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
                          <BsFillTrashFill size={25} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div id="div-price-product" style={{ marginLeft: "70%" }}>
                    <h5>Price</h5>
                    <h5>${lineItem.product.price}</h5>
                  </div>
                </main>
              );
            })
          ) : !auth.id && localStorage.getItem("lineItem") ? (
            JSON.parse(localStorage.getItem("lineItem")).map(
              (lineItem, idx) => {
                return (
                  <main
                    id="display-lineitem"
                    key={lineItem.product.id}
                    style={{ borderBottom: "1px solid black" }}
                  >
                    <img
                      src={lineItem.product.imageUrl}
                      id="display-photo-lineitem"
                      style={{ height: "250px" }}
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
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <p style={{ marginRight: "10px" }}>
                            <span>Quantity</span>{" "}
                          </p>
                          <select
                            style={{ height: "26px", marginRight: "10px" }}
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
                            onClick={() =>
                              deleteLineItem(lineItem.product, qtyZero)
                            }
                          >
                            <BsFillTrashFill size={25} />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div id="div-price-product" style={{ marginLeft: "70%" }}>
                      <h5>Price</h5>
                      <h5>${lineItem.product.price}</h5>
                    </div>
                  </main>
                );
              }
            )
          ) : (

            <div className="container h-75" style={{}}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <GiBookshelf size={180} />
                <h3 className="d-block mt-4 mb-5">
                  There are no items in your cart
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
