import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import './style.css'
import CartPreview from "./cartPreview";
import SideMenu from "./sideMenu";

const Header = () => {
    const cartItemsCount = useSelector((state) => state.cart.totalQuantity)
    const wishlistItemsCount = useSelector((state) => state.wishlist.totalQuantity)
    const [menuVisibility, setMenuVisibility] = useState(false)
    const navigate = useNavigate()
    const [cartPreviewVisibility, setCartPreviewVisibility] = useState(false)

    const [sex,setSex] = useState("")

    const handleMenu = () => {
        setMenuVisibility(!menuVisibility)
    }
    return (
        <div>
            <header>
                <div className="wrapper header-flex">
                    <nav>
                         <span style={{cursor:"pointer"}} onClick={(e)=>{
                             handleMenu()
                             setSex("men")
                         }}>Pánské</span>
                        <span style={{cursor:"pointer"}} onClick={(e)=>{
                            handleMenu()
                            setSex("women")
                        }}> Dámské</span>
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
            {menuVisibility && <SideMenu config={{
                sex:sex,
                setVisibility:setMenuVisibility
            }}/>}
        </div>
    );
};

export default Header;