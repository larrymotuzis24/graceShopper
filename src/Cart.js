import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart, auth }) => {
  return (
    <div id="cart-page">
      {auth.id ? (
        <h2>
          Welcome, {auth.firstName} {auth.lastName}!
        </h2>
      ) : null}

      <ul>
        {cart.lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              {lineItem.product.name} {lineItem.quantity}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect((state) => state)(Cart);
