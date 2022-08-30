import React from 'react';
import {useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion"
const successHtml = <div className={"payment-success"}><FontAwesomeIcon icon={faCircleCheck}/> <span>Platba byla přijata!</span></div>;
const pendingHtml = <div className={"payment-pending"}><FontAwesomeIcon icon={faCircleExclamation}/> <span>Platba se zpracovává, dáme vědět až bude přijata.</span>
</div>;
const errorHtml = <div className={"payment-error"}><FontAwesomeIcon icon={faCircleXmark}/> <span>Platba se nezdařila, zkuste prosím jinou metodu platby..</span>
</div>;

const CheckoutStatus = () => {

    const stripe = useStripe();
    const [html, setHtml] = useState(<h1>Loading...</h1>);
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
                        setHtml(successHtml);
                        break;

                    case 'processing':
                        setHtml(pendingHtml);
                        break;

                    case 'requires_payment_method':
                        // Redirect your user back to your payment page to attempt collecting
                        // payment again
                        setHtml(errorHtml);
                        break;

                    default:
                        setHtml(<h1>něco šlo špatně xd</h1>)
                        break;
                }
            });
        setTimeout(()=>{
             navigate(`../../../order/${paymentId}`)

        }, 5000)
    }, [stripe]);

    return <motion.div className="checkout-status"
                       initial={{opacity:0}}
                       animate={{opacity:1}}
                       exit={{opacity:0}}>
        {html}
    </motion.div>;

};

export default CheckoutStatus;