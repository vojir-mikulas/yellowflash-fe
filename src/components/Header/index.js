import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import './style.css'
import CartPreview from "./cartPreview";

const Header = () => {
    const cartItemsCount = useSelector((state) => state.cart.totalQuantity)
    const wishlistItemsCount = useSelector((state) => state.wishlist.totalQuantity)
    const [sideMenuVisibility, setSideMenuVisibility] = useState(false)
    const navigate = useNavigate()
    const [cartPreviewVisibility, setCartPreviewVisibility] = useState(false)

    const handleMenu = () => {

    }
    return (
        <div>
            <header>
                <div className="wrapper header-flex">
                    <nav>
                        <Link to={"men/tshirt"}>Pánské </Link>
                        <Link to={"women/tshirt"}>Dámské</Link>
                    </nav>
                    <h1 style={{cursor: "pointer"}} onClick={() => {
                        navigate("/", {replace: true})
                    }}>YELLOW FLASH</h1>
                    <div>
                        <span>login </span>
                        <Link to="/wishlist">oblíbené({wishlistItemsCount})</Link>
                        <div style={{position:"relative"}}  onMouseLeave={()=>(setCartPreviewVisibility(false))}>
                            <span style={{cursor: "pointer"}} onMouseEnter={()=>(setCartPreviewVisibility(true))}  onClick={(e)=>{
                                navigate("/cart", {replace:true})
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();
                            }}>košík({cartItemsCount})</span>
                            {cartPreviewVisibility && <CartPreview/>}
                        </div>
                    </div>
                </div>
            </header>
            <div className={"side-menu"} style={{display: sideMenuVisibility ? "block" : "none"}}>
                <ul>
                    <li>pog</li>
                    <li>pog</li>
                    <li>pog</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;