import React, { useState} from "react";
import { connect } from "react-redux";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {fetchUsers} from './store'
import states from "./store/states";


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}


const PaymentForm = (props) => {

   const orderTotal = Math.round(props.orderTotal * 100)

    console.log(props.auth)

    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
  
    if(!error){
        try{
            const { id } = paymentMethod
            const response = await axios.post('/api/payment', {
                amount:orderTotal,
                id
            })

            if(response.data.success){
                console.log('succesful payment')
                setSuccess(true)
            }
        }
        catch(error){
            console.log('error', error)
        }

    }

    else {  
        console.log(error.message)
    }
}

    return (
        <>
        {!success ?    <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className='FormRow'>
                    <CardElement options={CARD_OPTIONS} />

                </div>
            </fieldset>
            <button id='paymentBTN' onClick={() => console.log('updateInventroy')}> Pay </button>
        </form> 
        :
        <div>
            <h2> You just bought some sweet books!! </h2>
        </div>
         }

        </>
    )
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
      orderTotal
    };
  };

const mapDispatchToProps = (dispatch, { history }) => {
    return {
      updateLineItem: (book, quantity) =>
        dispatch(updateLineItem(book, quantity, history)),
      deleteLineItem: (book, qtyZero) =>
        dispatch(deleteLineItem(book, qtyZero, history)),
        load: () => {
            dispatch(fetchUsers())
          }
    };
  }; 
  

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)