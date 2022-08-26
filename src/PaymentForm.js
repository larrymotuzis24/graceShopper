import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createOrderFromCart } from './store';
import { Redirect } from 'react-router-dom';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#000',
      color: '#000',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

    },
    invalid: {
      iconColor: '#666',
      color: '#666',
    },
  },
};

const PaymentForm = (props) => {
  const orderTotal = Math.round(props.orderTotal * 100);

  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { createOrderFromCart, auth, address } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/api/payment', {
          amount: orderTotal,
          id,
        });

        if (response.data.success) {
          createOrderFromCart();
          setSuccess(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset
            className="FormGroup m-0 mb-4"
            style={{
              border: '1px solid black',
              borderRadius: '.375rem',
              backgroundColor: '#EEF7EA',
              boxShadow: 'none',
              padding: '0 .75rem',
            }}
          >
            <div
              className="FormRow"
              style={{
                border: 'none',
                padding: '0',
                margin: '0',
              }}
            >
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button
            id="paymentBTN"
            style={{
              backgroundColor: 'black',
              width: 'fit-content',
              boxShadow: 'none',
              color: '#EEF7EA',
              borderRadius: '.375rem',
              padding: '.375rem .75rem',
              margin: '0',
            }}
          >
            SUBMIT ORDER
          </button>
        </form>
      ) : (
        <Redirect to="/confirmation" />
      )}
    </>
  );
};

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
  const shippingTotal = subTotal * 0.02;
  const beforeTax = subTotal + shippingTotal;
  const taxCollected = subTotal * 0.081;
  const orderTotal = subTotal + shippingTotal + taxCollected;
  return {
    auth,
    cart,
    subTotal,
    totalQty,
    orderTotal,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createOrderFromCart: () => {
      dispatch(createOrderFromCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(PaymentForm);
