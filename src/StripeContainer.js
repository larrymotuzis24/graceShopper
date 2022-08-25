import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import  React from 'react';
import PaymentForm from './PaymentForm';


const PUBLIC_KEY = 'pk_test_51LY9OXEi9E0TRZFzHZ7ngRoIwJQSJFmsILaHC27Z416tSbMOefI3Jc5Emu63vS2C8tlMFH5pZEGhSqVnKoHG8gpS00ykTQu8Tp';

const stripeTestProimse = loadStripe(PUBLIC_KEY);

export default function StripeContainer({address}) {
    
    return (
        <Elements stripe={stripeTestProimse}>
            <PaymentForm address={address}/>
        </Elements>
    )
};