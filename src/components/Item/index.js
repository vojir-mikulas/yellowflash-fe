import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
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


            <div className="item-card"  style={{cursor: "pointer"}} onClick={() => {
                navigate("../" + props.item.id)
            }}>
                {/*todo:nehardcodovat url */}
                <img src={`${process.env.REACT_APP_SERVER_URL}/${props.item.images[0] ? props.item.images[0].url : "xd"}`}
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

    );
};

export default Item;