import React, { useState} from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

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


export default function PaymentForm() {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(e) => {
        e.preventDefault();
        cont [error, paymentmethod ] = await stripe.createPaymentMethod({
            type:'card', 
            card: elements.getElement(CardElement)
        })

  
    if(!error){
        try{
            const { id } = paymentmethod
            const response = await axios.post('/payment', {
                amount:1000,
                id
            })
            if(response.data.success){
                console.log('succesful payment')
                setSuccess(true)
            }
        }
        catch(ex){
            console.log('error', error)
        }

    }

    else {  
        console.log(eroor.message)
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
            <button> Pay </button>
        </form> 
        :
        <div>
            <h2> You just bought some sweet books!! </h2>
        </div>
         }

        </>
    )
}