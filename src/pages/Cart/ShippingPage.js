import React, {useEffect, useRef, useState} from 'react';
import CartDashboard from "./CartDashboard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import axios from "axios";
import {cartActions} from "../../redux/cart-slice";


const ShippingPage = () => {
    const [shippingMethod, setShippingMethod] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setShipping = (method,price) => {
        dispatch(billingInfoActions.setShipping({
            method,
            price
        }))
    }

    useEffect(() => {

        if (shippingMethod !== "") {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/shipping/${shippingMethod}`).then(response => {
                setShipping(shippingMethod,parseInt(response.data.price))

            }).catch(error => {
                console.error("Error fetching data: ", error)
            })
        }
    }, [shippingMethod])
    return (
        <div>

            <form>
                <label htmlFor=""><input onChange={(e) => {
                    setShippingMethod(e.currentTarget.value)
                }} type="radio" name="shipping" value="DPD" id=""/> DPD</label> <br/>
                <label htmlFor=""><input onChange={(e) => {
                    setShippingMethod(e.currentTarget.value)
                }} type="radio" name="shipping" value="Packeta" id=""/> Packeta</label>
            </form>
            <CartDashboard options={{
                text: "Přejít k platbě",
                onClickEvent: (e) => {
                    e.preventDefault()
                    if (shippingMethod === "") return

                    navigate("../checkout/payment")
                },
                disabled: false
            }}/>
        </div>
    );
};

export default ShippingPage;