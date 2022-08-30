import React from 'react';
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/cart-slice";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown,faArrowUp} from "@fortawesome/free-solid-svg-icons";
const CartItem = (props) => {
    const dispatch = useDispatch();
    const removeFromCart = (id, size) => {
        dispatch(cartActions.removeFromCart({
            id,
            size
        }))
    }
    const handleIncrementQuantity = (id, size) => {
        dispatch(cartActions.incrementQuantity({
            id,
            size
        }))
    }
    const handleDecrementQuantity = (id, size) => {
        dispatch(cartActions.decrementQuantity({
            id,
            size
        }))
    }
    return (
        <div className={"cartItem"}>
            <div className={"cartItem--container"}>
                <img className={"cartItem__img"}
                     src={`${process.env.REACT_APP_SERVER_URL}/${props.item.image ? props.item.image : "xd"}`} alt={"preview"}/>

                <div>
                    <h2><Link to={`/${props.item.id}`}>{props.item.name}</Link></h2>
                    <h2>{props.item.price} Kč</h2>
                    <div className={"cartItem__details"}>
                        <div><h3>Velikost</h3> <span>{props.item.size}</span></div>
                        <div><h3>Barva</h3> <span>{props.item.color}</span></div>
                        <div><h3>Množství</h3>
                            <span className={"cartItem__details__buttons"}>
                                <button onClick={() => {
                                    handleDecrementQuantity(props.item.id, props.item.size)
                                }}> <FontAwesomeIcon style={{fontSize:"1.3rem"}} icon={faArrowDown}/>
                                </button>
                                {props.item.quantity}
                                <button onClick={() => {
                                    handleIncrementQuantity(props.item.id, props.item.size)
                                }}><FontAwesomeIcon style={{fontSize:"1.3rem"}} icon={faArrowUp}/>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <span className={"cartItem--removeFromCart"} onClick={() => {
                removeFromCart(props.item.id, props.item.size)
            }} style={{color: "red", cursor: "pointer", margin: "10px"}}>❌</span>
        </div>
    );
};

export default CartItem;