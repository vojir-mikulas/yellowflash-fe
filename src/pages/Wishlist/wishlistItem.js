import React, {useRef} from 'react';
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/cart-slice";
import {Link, useNavigate} from "react-router-dom";
import {wishlistActions} from "../../redux/wishlist-slice";
import useWishlistCheck from "../../hooks/WishlistCheck";
import cart from "../Cart";

const WishlistItem = (props) => {
    const navigate = useNavigate()
    const sizeSelect = useRef(null)
    const dispatch = useDispatch();
    const handleWishlist = (id) => {
        dispatch(wishlistActions.handleWishlist({
            id,
        }))
    }
    const addToCart = (id, size) => {
        dispatch(cartActions.addToCart({
            id,
            size,
        }))
    }
    const isInWishlist = useWishlistCheck(props.item.id)

    return (
        <div  >

            <div className="item-card wishlist__item">
                {/*todo:nehardcodovat url */}
                <img style={{cursor: "pointer"}} onClick={() => {
                    navigate("../" + props.item.id)
                }} src={`${process.env.REACT_APP_SERVER_URL}/${props.item.images[0] ? props.item.images[0].url : "xd"}`}
                     alt={props.item.images[0] ? props.item.images[0].url : "xd"}/>
                <div className="info">
                    <span> <h3> {props.item.name}</h3></span>
                    <button onClick={(e) => {
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        handleWishlist(props.item.id)
                    }} className="like">  {isInWishlist ? <span>❤️</span> : <span>🖤</span>}  </button>
                    <span> {"CZK" + props.item.price}</span>

                </div>
                <select ref={sizeSelect} name="" id="">
                    <option value="" selected disabled hidden>Vyberte velikost</option>
                    {props.item.sizes.map((size)=>{
                        return(
                            <option value={size.size}>{size.size}</option>
                        )
                    })}
                </select>
                <button className={"cartButton"} onClick={()=>{
                    if(sizeSelect.current.value === "") return
                    handleWishlist(props.item.id)
                    addToCart(props.item.id,sizeSelect.current.value)
                }}>Přidat do košíku</button>
            </div>
        </div>
    );
};

export default WishlistItem;