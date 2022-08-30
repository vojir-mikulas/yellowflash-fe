import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CartPreview from "./cartPreview";
import SideMenu from "./sideMenu";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping,faHeart} from "@fortawesome/free-solid-svg-icons";

const getWindowWidth = () => {
    const {innerWidth} = window;
    return innerWidth
}

const Header = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth())


    const cartItemsCount = useSelector((state) => state.cart.totalQuantity)
    const wishlistItemsCount = useSelector((state) => state.wishlist.totalQuantity)
    const [menuVisibility, setMenuVisibility] = useState(false)
    const navigate = useNavigate()
    const [cartPreviewVisibility, setCartPreviewVisibility] = useState(false)

    const [sex, setSex] = useState("")

    const handleMenu = () => {
        setMenuVisibility(!menuVisibility)
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            <header className={"header"}>
                <div className="wrapper header--flex">
                    <nav className="header__nav">
                         <span className={(sex === "men") && "sex--checked"}   style={{cursor: "pointer"}} onClick={(e) => {
                             handleMenu()
                             setSex("men")
                         }}>Pánské</span>
                        <span className={(sex === "women") && "sex--checked"} style={{cursor: "pointer"}} onClick={(e) => {
                            handleMenu()
                            setSex("women")
                        }}> Dámské</span>
                    </nav>
                    <h1 style={{cursor: "pointer"}} onClick={() => {
                        navigate("/", {replace: true})
                    }}>YELLOW FLASH</h1>
                    <div className="header__cart-nav">
                        <div style={{position: "relative"}}><span style={{position:"relative"}} onClick={()=>{navigate("/wishlist",{replace:true})}}><FontAwesomeIcon className="href" icon={faHeart}/><span
                            className="item-count">{wishlistItemsCount}</span></span>
                        </div>
                        <div style={{position: "relative"}} onMouseLeave={() => (setCartPreviewVisibility(false))}>
                            <span style={{position:"relative"}} onMouseEnter={() => (setCartPreviewVisibility(true))} onClick={(e) => {
                                navigate("/cart", {replace: true})
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();
                            }}> <FontAwesomeIcon className="href" icon={faCartShopping}/> <span className="item-count">{cartItemsCount}</span></span>
                            {((windowWidth >= 1000) && cartPreviewVisibility) && <CartPreview/>}
                        </div>
                    </div>
                </div>
                {(windowWidth <= 500) && <span onClick={()=>(setMenuVisibility(true))} className={"menu-icon"}>menu</span>}
            </header>
            {menuVisibility && <SideMenu config={{
                sex: sex,
                setVisibility: setMenuVisibility,
                width: windowWidth,
                setSex:setSex,
                cartItemsCount:cartItemsCount,
                wishlistItemsCount:wishlistItemsCount
            }}/>}
        </div>
    );
};

export default Header;