import React, {useEffect, useRef, useState} from 'react';
import CartDashboard from "./CartDashboard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import axios from "axios";
import DPD from "../../img/DPD.svg"
import Packeta from "../../img/Packeta.svg"
import Posta from "../../img/Posta.svg"
import Balikovna from "../../img/Balikovna.svg"
import InputCheckboxShipping from "./InputCheckboxShipping";
import {motion} from "framer-motion"

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
        <motion.div className={"cart-page"}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}>
            <span style={{textAlign:"center"}}> YELLOWFLASH.COM <span className="slash">/</span> ZPŮSOB DORUČENÍ</span>
            <h1>ZPŮSOB DORUČENÍ</h1>
            <div className="cart-page__container">
                <form className={"cart-page__shipping"}>
                    <InputCheckboxShipping options={{
                        value:"DPD",
                        text:"DPD",
                        name:"shipping",
                        logo:DPD,
                        price:55,
                        onChangeEvent: (e)=>{
                            setShippingMethod(e.currentTarget.value)
                        }
                    }}/>
                    <InputCheckboxShipping options={{
                        value:"Packeta",
                        text:"Zásilkovna",
                        name:"shipping",
                        logo:Packeta,
                        price:69,
                        onChangeEvent: (e)=>{
                            setShippingMethod(e.currentTarget.value)
                        }
                    }}/>
                    <InputCheckboxShipping options={{
                        value:"posta",
                        text:"Česká pošta",
                        name:"shipping",
                        logo:Posta,
                        price:85,
                        onChangeEvent: (e)=>{
                            setShippingMethod(e.currentTarget.value)
                        }
                    }}/>
                    <InputCheckboxShipping options={{
                        value:"balikovna",
                        text:"Balíkovna",
                        name:"shipping",
                        logo:Balikovna,
                        price:99,
                        onChangeEvent: (e)=>{
                            setShippingMethod(e.currentTarget.value)
                        }
                    }}/>
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
        </motion.div>
    );
};

export default ShippingPage;