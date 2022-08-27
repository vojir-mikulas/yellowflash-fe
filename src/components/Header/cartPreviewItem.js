import React from 'react';
import {useNavigate} from "react-router-dom";

const CartPreviewItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className={"cart-preview__item"} onClick={()=>{
            navigate(`/${props.item.id}`,{replace:true})
        }}>
            <img
                 src={`${process.env.REACT_APP_SERVER_URL}/${props.item.image ? props.item.image : "xd"}`} alt={"preview"}/>
            <div className="cart-preview__item__desc">
                <h2>{props.item.name}</h2>
                <h2 >{props.item.price} Kč</h2>
                <div className="cart-preview__item__desc__details">
                    <span>Velikost: {props.item.size}</span> <br/>
                    <span>Množství: {props.item.quantity}</span>
                </div>
            </div>
        </div>
    );
};

export default CartPreviewItem;