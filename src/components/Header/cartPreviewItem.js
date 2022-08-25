import React from 'react';
import {useNavigate} from "react-router-dom";

const CartPreviewItem = (props) => {
    const navigate = useNavigate
    return (
        <div onClick={()=>{
            navigate(`/${props.item.id}`,{replace:true})
        }}>
            <img className={"cartItem__img"}
                 src={`${process.env.REACT_APP_SERVER_URL}/${props.item.image ? props.item.image : "xd"}`} alt={"preview"}/>
            <div>
                <h2>{props.item.name}</h2>
                <span>props.item.price</span>
                <div>
                    <span>Velikost: {props.item.size}</span>
                    <span>Množství: {props.item.quantity}</span>
                </div>
            </div>
        </div>
    );
};

export default CartPreviewItem;