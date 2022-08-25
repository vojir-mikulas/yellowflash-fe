import React from 'react';
import {useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const CheckoutStatus = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const paymentId = new URLSearchParams(window.location.search).get(
        'payment_intent'
    );
    useEffect(() => {
        if (!stripe) {
            return;
        }

        // Retrieve the "payment_intent_client_secret" query parameter appended to
        // your return_url by Stripe.js
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        // Retrieve the PaymentIntent
        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({paymentIntent}) => {

                switch (paymentIntent.status) {
                    case 'succeeded':
                        setMessage('Success! Payment received.');
                        break;

                    case 'processing':
                        setMessage("Payment processing. We'll update you when payment is received.");
                        break;

                    case 'requires_payment_method':
                        // Redirect your user back to your payment page to attempt collecting
                        // payment again
                        setMessage('Payment failed. Please try another payment method.');
                        break;

                    default:
                        setMessage('Something went wrong.');
                        break;
                }
            });
        setTimeout(()=>{
            navigate(`../../../order/${paymentId}`)
            console.log("XD!")
        }, 5000)
    }, [stripe]);

    return <div>{message}</div>;

};

export default CheckoutStatus;