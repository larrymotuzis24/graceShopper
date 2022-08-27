import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem, fetchCoupons } from './store';
import { Link } from 'react-router-dom';
import StripeContainer from './StripeContainer';

class Order extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      couponCode: '',
      orderCalculated: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.applyDiscount = this.applyDiscount.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentDidMount() {
    this.props.fetchCoupons();
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

  applyDiscount(orderTotal, percentage) {
    const discount = orderTotal * (percentage / 100);
    const totalCalculated = orderTotal - discount;
    this.setState({ totalCalculated: totalCalculated.toFixed(2) });
  }

  render() {
    const {
      auth,
      cart,
      updateLineItem,
      deleteLineItem,
      subTotal,
      totalQty,
      states,
      coupons,
    } = this.props;
    const { onChange, applyDiscount } = this;
    const {
      firstName,
      lastName,
      email,
      address,
      zipCode,
      state,
      city,
      couponCode,
      totalCalculated,
    } = this.state;

    const coupon =
      coupons.find((coupon) => coupon.code === couponCode.trim()) || {};
    const qtyZero = 0;
    const shippingTotal = subTotal * 0.02;
    const beforeTax = subTotal + shippingTotal;
    const taxCollected = subTotal * 0.081;
    const orderTotal = subTotal + shippingTotal + taxCollected;
    const { avatar } = this.state;
    cart.lineItems.sort((a, b) => {
      return a.id - b.id;
    });
    return (
      <div
        id=""
        className="container mt-4"
        style={{ marginBottom: '20vh', height: '52vh' }}
      >
        {/* Checkout page heading */}
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="">Checkout</h2>
          {auth.id ? (
            <div className="d-flex align-items-center">
              {!avatar ? (
                <img
                  src={auth.imageUrl}
                  style={{
                    height: '4rem',
                    width: '4rem',
                    borderRadius: '1000px',
                    overflow: 'hidden',
                  }}
                />
              ) : (
                <img src={avatar} />
              )}
              <p className="lead ms-4 mb-0">
                Welcome, {auth.firstName} {auth.lastName}!
              </p>
            </div>
          ) : null}
        </div>
        {/* <p>{totalQty} items</p> */}
        {/* Checkout page heading */}
        <div className="w-100 row row-cols-2 g-2 justify-content-between">
          <div className="mt-5 col-md-6">
            {/*Shipping address and payment information container */}
            <form className="">
              <h6 className="" style={{}}>
                Shipping Address
              </h6>
              <hr style={{}} />

              <div>
                <label htmlFor="selectAddress" className="form-label small">
                  Select one of your addresses
                </label>
                <select
                  value={address}
                  name="address"
                  id="selectAddress"
                  onChange={onChange}
                  className="form-select"
                >
                  <option>{auth.address}</option>
                  {auth.secondaryAddress
                    ? auth.secondaryAddress.map((secAddress, idx) => {
                        return (
                          <option key={idx} value={secAddress}>
                            {secAddress}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div className="d-flex">
                <div className="w-50 me-2">
                  <label htmlFor="firstName" className="form-label small">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    aria-label="First name"
                    style={{}}
                    onChange={onChange}
                  />
                </div>
                <div className="w-50 ms-2">
                  <label htmlFor="firstName" className="form-label small">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    aria-label="Last name"
                    style={{}}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="inputEmail4" className="form-label small">
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
              <div>
                <label htmlFor="inputAddress" className="form-label small">
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
              <div className="d-flex">
                <div className="me-2" style={{}}>
                  <label htmlFor="inputCity" className="form-label small">
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
                <div className="mx-2" style={{}}>
                  <label
                    htmlFor="inputState"
                    className="form-label small small"
                  >
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
                <div className="ms-2" style={{}}>
                  <label htmlFor="inputZip" className="form-label small small">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={zipCode}
                    className="form-control"
                    id="inputZip"
                    onChange={onChange}
                  />
                </div>
              </div>
            </form>
            <div>
              <h6 className="mt-5">Payment Method</h6>
              <hr />
              <div className="form-check" style={{ margin: '1.25rem 0rem' }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  style={{}}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Billing Address is the same as Shipping Address
                </label>
              </div>
              <StripeContainer orderTotal={orderTotal} address={address} />
            </div>
            <div>
              {!auth.secondaryAddress ? (
                <p>{auth.address}</p>
              ) : (
                <div id=""></div>
              )}
            </div>
          </div>
          <div className="col-md-5 mt-5">
            {/* Cart summary container */}

            <div id="">
              {/* Cart summary items */}
              <div className="d-flex justify-content-between align-items-baseline">
                <h6 className="" style={{ margin: '0.5rem 0rem' }}>
                  Cart Summary
                </h6>
                <a href="#cart" className="text-link">
                  EDIT CART
                </a>
              </div>
              <hr style={{ margin: '0.5rem 0rem' }} />
              <div>
                {cart.lineItems.map((lineItem) => {
                  return (
                    <div key={lineItem.id}>
                      <div className="d-flex flex-row-nowrap justify-content-between my-3">
                        <a
                          href={`#books/${lineItem.productId}`}
                          className="d-flex img-link"
                        >
                          <img
                            src={lineItem.product.imageUrl}
                            id=""
                            style={{
                              width: '6rem',
                              marginRight: '1rem',
                            }}
                          ></img>

                          <p>
                            {lineItem.product.title}
                            <br />
                            {lineItem.product.author}
                          </p>
                        </a>
                        <p style={{}}>${lineItem.product.price}</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
            <div id="" style={{}}>
              {/* Cart summary total */}
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping</p>
                <p>${shippingTotal.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-0">Taxes</p>
                <p className="mb-0">${taxCollected.toFixed(2)}</p>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: '1rem' }}
              >
                <p className="mb-0">Coupon Code</p>
                <input
                  type="text"
                  placeholder="Add Coupon Code"
                  value={couponCode}
                  onChange={(ev) =>
                    this.setState({ couponCode: ev.target.value })
                  }
                  disabled={totalCalculated > 0 ? true : false}
                ></input>
                <button
                  className="btn btn-dark"
                  onClick={() => applyDiscount(orderTotal, coupon.percentage)}
                >
                  APPLY
                </button>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p id="" className="lead my-3">
                  Total
                </p>
                <p id="" className="lead my-3">
                  {totalCalculated > 0
                    ? totalCalculated
                    : orderTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, cart, states, coupons }) => {
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
    states,
    coupons,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateLineItem: (book, quantity) =>
      dispatch(updateLineItem(book, quantity, history)),
    deleteLineItem: (book, qtyZero) =>
      dispatch(deleteLineItem(book, qtyZero, history)),
    fetchCoupons: () => dispatch(fetchCoupons()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
