import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CartPreview from "./cartPreview";
import SideMenu from "./sideMenu";

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
                        <div style={{position: "relative"}}><Link to="/wishlist">oblíbené<span
                            className="item-count">{wishlistItemsCount}</span></Link>
                        </div>
                        <div style={{position: "relative"}} onMouseLeave={() => (setCartPreviewVisibility(false))}>
                            <span className="href" style={{cursor: "pointer"}}
                                  onMouseEnter={() => (setCartPreviewVisibility(true))} onClick={(e) => {
                                navigate("/cart", {replace: true})
                                e.cancelBubble = true;
                                if (e.stopPropagation) e.stopPropagation();
                            }}>košík <span className="item-count">{cartItemsCount}</span></span>
                            {((windowWidth >= 500) && cartPreviewVisibility) && <CartPreview/>}
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