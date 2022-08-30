import React from 'react';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CartPreviewItem from "./cartPreviewItem";
import CartToastItem from "./CartToastItem";

const CartToast = () => {

    const cartQueue = useSelector((state) => state.cart.cartQueue)


    return (
        <div className={"cart-toast "}>
            {cartQueue.map((cartItem)=>{

                    return(
                        <CartToastItem key={cartItem.id + cartItem.size + cartItem.quantity} item={{
                            id: cartItem.id,
                            size: cartItem.size,
                            quantity: cartItem.quantity,
                        }}/>
                    )
                })
            }
        </div>
    );
};

export default CartToast;