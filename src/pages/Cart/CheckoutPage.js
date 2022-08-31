import {Outlet} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState, useEffect} from "react";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";


const stripePromise = loadStripe(
    'pk_test_51LUYX8FLfwWiF0fGHuxjj0960HHMaEA2OJGvfkw0KXijSMCmVTiVUEbflK91VsWStvxvHOdSwIfeeVRm0eDOejfT00CXaUnKN0'
);

const CheckoutPage = () => {
    const [loading, setLoading] = useState(true)
    const cartItems = useSelector((state) => state.cart.itemList)
    const discountCode = useSelector((state) => state.billingInfo.discount.name ? state.billingInfo.discount.name : null)
    const billingInformation = useSelector((state) => state.billingInfo.deliveryInformation)
    const [clientSecret, setClientSecret] = useState("")


    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/stripe/secret`, {
            items: cartItems,
            shippingMethod: "DPD",
            discountCode: discountCode,
            billingInformation: billingInformation
        }).then(response => {
            const {clientSecret} = response.data
            setClientSecret(clientSecret)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    }, [])

    const options = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'none',
            variables: {
                fontFamily: 'Verdana',
                fontLineHeight: '1.5',
                borderRadius: '0',
                colorBackground: '#dfdfdf'
            },
            rules: {
                '.Input': {
                    backgroundColor: '#ffffff',
                    boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080'
                },
                '.Input--invalid': {
                    color: '#DF1B41'
                },
                '.Tab, .Block': {
                    boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
                },
                '.Tab:hover': {
                    backgroundColor: '#eee'
                },
                '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
                    backgroundColor: '#ccc'
                }
            }
        }

    }

    if (loading) return (<h1>loading...</h1>)
    return (
        <Elements stripe={stripePromise} options={options}>
            <Outlet/>
        </Elements>
    );
};




export default CheckoutPage;