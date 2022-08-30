import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from "../pages/Home";
import Items from "../pages/Items";
import ItemDetail from "../pages/ItemDetail";
import Cart from "../pages/Cart";
import CartPage from "../pages/Cart/CartPage";
import UserDataPage from "../pages/Cart/UserDataPage";
import ShippingPage from "../pages/Cart/ShippingPage";
import CheckoutPage from "../pages/Cart/CheckoutPage";
import CheckoutForm from "../pages/Cart/CheckoutForm";
import CheckoutStatus from "../pages/Cart/CheckoutStatus";
import WishlistPage from "../pages/Wishlist";
import OrderPage from "../pages/order";
import PaymentStatus from "../pages/PaymentStatus";
import ErrorPage from "../pages/ErrorPage";
import {AnimatePresence} from "framer-motion"

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/:sex/:category" element={<Items/>}/>
                <Route path="/:id" element={<ItemDetail/>}/>
                <Route path="/cart" element={<Cart/>}>
                    <Route index element={<CartPage/>}/>
                    <Route path="userdata" element={<UserDataPage/>}/>
                    <Route path="shipping" element={<ShippingPage/>}/>
                    <Route path="checkout" element={<CheckoutPage/>}>
                        <Route path="payment" element={<CheckoutForm/>
                        }/>
                        <Route path="status" element={<CheckoutStatus/>}/>
                    </Route>
                </Route>
                <Route path="/wishlist" element={<WishlistPage/>}/>
                <Route path="/order/:id" element={<OrderPage/>}/>
                <Route path="/success" element={<PaymentStatus/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;