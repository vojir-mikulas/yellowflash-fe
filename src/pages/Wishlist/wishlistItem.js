import React from 'react';
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/cart-slice";
import {Link, useNavigate} from "react-router-dom";
import {wishlistActions} from "../../redux/wishlist-slice";
import useWishlistCheck from "../../hooks/WishlistCheck";

const WishlistItem = (props) => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const handleWishlist = (id) => {
        dispatch(wishlistActions.handleWishlist({
            id,
        }))
    }

    const isInWishlist = useWishlistCheck(props.item.id)

    return (
        <div style={{cursor: "pointer"}} onClick={() => {
            navigate("../" + props.item.id)
        }}>

            <div className="item-card">
                {/*todo:nehardcodovat url */}
                <img src={`http://localhost:3000/${props.item.images[0] ? props.item.images[0].url : "xd"}`}
                     alt={props.item.images[0] ? props.item.images[0].url : "xd"}/>
                <div className="info">
                    <span> <h3> {props.item.name}</h3></span>
                    <button onClick={(e) => {
                        e.cancelBubble = true;
                        if (e.stopPropagation) e.stopPropagation();
                        handleWishlist(props.item.id)
                    }} className="like">  {isInWishlist ? <span>❤️</span> : <span>🖤</span>}  </button>
                    <span> {"CZK" + props.item.price}</span>
                    <button onClick={()=>{
                        handleWishlist(props.item.id)

                    }}>Přidat do košíku</button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;