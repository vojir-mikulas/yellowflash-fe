import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {wishlistActions} from "../../redux/wishlist-slice";
import useWishlistCheck from "../../hooks/WishlistCheck";

const Item = (props) => {
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

                </div>
            </div>
        </div>
    );
};

export default Item;