import React from 'react';
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useDispatch} from "react-redux";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import {cartActions} from "../../redux/cart-slice";
import {useRef, useState} from "react";
import CartDashboard from "./CartDashboard";
import {motion} from "framer-motion"
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();
    const resetCart = () => {
        dispatch(billingInfoActions.setShipping({
            method: "",
            price: 0
        }))
        dispatch(cartActions.resetCart({}))
        dispatch(billingInfoActions.setDiscount({
            name: "",
            amount: 0
        }))
    }

    const [errorMessage, setErrorMessage] = useState(null);

    const formNode = useRef(null)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return
        resetCart();
        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `https://${window.location.hostname}/cart/checkout/status`,
            },
        });
        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }

    }
    return (
      <motion.div className="cart-page"

                  initial={{opacity:0}}
                  animate={{opacity:1}}
                  exit={{opacity:0}}>
          <span style={{textAlign:"center"}}> YELLOWFLASH.COM <span className="slash">/</span> NAKUPNÍ KOŠÍK</span>
          <h1>NÁKUPNÍ KOŠÍK</h1>
          <div className={"cart-page__container"}>

              <form ref={formNode} onSubmit={handleSubmit} style={{backgroundColor: "lightgray", padding: "50px"}}>
                  <PaymentElement/>
                  {/* Show error message to your customers */}
                  {errorMessage && <div>{errorMessage}</div>}
                  <p><br/>
                      <h3>Tip</h3>
                  Pro potvrezní v test modu použijte <br/>
                     <b> Číslo karty:</b> 4242 4242 4242 4242 <br/>
                     <b> Konec platnosti:</b> vzdálené datum <br/>
                      <b>CVC: </b>jakékoliv tříciferné číslo <br/>
                  </p>
              </form>
              <CartDashboard options={{
                  text: "Zaplatit",
                  onClickEvent: handleSubmit,
                  disabled: !stripe
              }}/>
          </div>
      </motion.div>
    );
};
export default CheckoutForm;