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
                        setMessage('Platba byla přijata!');
                        break;

                    case 'processing':
                        setMessage("Platba se zpracovává, dáme vědět až bude přijata.");
                        break;

                    case 'requires_payment_method':
                        // Redirect your user back to your payment page to attempt collecting
                        // payment again
                        setMessage('Platba se nezdařila, zkuste prosím jinou metodu platby.');
                        break;

                    default:
                        setMessage('Něco šlo špatně xd');
                        break;
                }
            });
        setTimeout(()=>{
            navigate(`../../../order/${paymentId}`)

        }, 5000)
    }, [stripe]);

    return <div>{message}</div>;

};

export default CheckoutStatus;