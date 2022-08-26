import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLineItem, deleteLineItem } from "./store";
import { Link } from "react-router-dom";
import StripeContainer from "./StripeContainer";

class Order extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      email: this.props.auth.email,
      address: this.props.auth.address,
      city: this.props.auth.city,
      state: this.props.auth.state,
      zipCode: this.props.auth.zipCode,
    });
  }

  render() {
    const { auth, cart, updateLineItem, deleteLineItem, subTotal, totalQty, states } =
      this.props;
    const { onChange } = this;
    const { firstName, lastName, email, address, zipCode, state, city } =
      this.state;
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
              <h3
                style={{
                  margin: "40px",
                }}
              >
                Billing Address
              </h3>
              <div>
                <form className="row g-3">
                  <div
                    className="col"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      aria-label="First name"
                      style={{ width: "45%" }}
                      onChange={onChange}
                    />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      aria-label="Last name"
                      style={{ width: "45%" }}
                      onChange={onChange}
                    />
                  </div>

                  <div
                    className="col-md-6"
                    style={{
                      width: "100%",
                    }}
                  >
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      value={email}
                      id="inputEmail4"
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      value={address}
                      placeholder="Address"
                      onChange={onChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      className="col-md-6"
                      style={{
                        margin: "3px",
                      }}
                    >
                      <label htmlFor="inputCity" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        className="form-control"
                        id="inputCity"
                        onChange={onChange}
                      />
                    </div>
                    <div
                      className="col-md-4"
                      style={{
                        margin: "3px",
                      }}
                    >
                      <label htmlFor="inputState" className="form-label">
                        State
                      </label>
                      <select
                        name="state"
                        value={state}
                        onChange={onChange}
                        className="form-select"
                      >
                        <option value="">-- Select a State --</option>
                        {states.map((state) => {
                          return (
                            <option key={state.id} value={state.name}>
                              {state.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div
                      className="col-md-2"
                      style={{
                        margin: "3px",
                      }}
                    >
                      <label htmlFor="inputZip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        placeholder= "Zip Code"
                        value={zipCode}
                        className="form-control"
                        id="inputZip"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div
                    className="form-check"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      style={{ margin: "3px" }}
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Shipping Address same as Billing Address
                    </label>
                  </div>
                </form>

                <div>
                  {!auth.secondaryAddress ? (
                    <p>{auth.address}</p>
                  ) : (
                    <div id="shipping-address">
                      <label>Select the shipping address</label>
                      <select
                        value={address}
                        name="address"
                        onChange={onChange}
                      >
                        <option>{auth.address}</option>
                        {auth.secondaryAddress.map((secAddress, idx) => {
                          return (
                            <option key={idx} value={secAddress}>
                              {secAddress}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <div id="payment-info">
                <h3>Payment Method</h3>
                <StripeContainer orderTotal={orderTotal} address={address} />
              </div>

              <div
                id="total-line-items"
                style={{
                  width: "50%",
                  marginTop: "75px",
                }}
              >
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
              </div>
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
                          to="/order"
                          onClick={() =>
                            deleteLineItem(lineItem.product, qtyZero)
                          }
                        >
                          Delete
                        </Link>
                      </div>
                      <div id="div-price-product">
                        <p>Price</p>
                        <h5 style={{ fontSize: "20px" }}>
                          ${lineItem.product.price}
                        </h5>
                      </div>
                    </main>
                  );
                })}
              </div>
              <hr />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, cart, states }) => {
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
    states
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
