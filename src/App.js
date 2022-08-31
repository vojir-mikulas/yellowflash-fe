import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";

import Header from "./components/Header";
import {useEffect} from "react";
import axios from "axios";
import {cartActions} from "./redux/cart-slice";
import Footer from "./components/Footer/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import {AnimatePresence, motion} from "framer-motion"
import ScrollToTop from "./components/ScrollToTop";

function App() {
    const cartItems = useSelector((state) => state.cart.itemList)
    const dispatch = useDispatch()

    const setPrice = (price) => {
        dispatch(cartActions.setPrice({
            price
        }))
    }
    const getItems = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleById?ids=${cartItems.map(item => item.id).join(";")}`)
            let items = response.data

            setPrice(cartItems.map((cartItem) => {
                let itemData = items.find(item => item.id === cartItem.id)
                return itemData.price * cartItem.quantity
            }).reduce((a, b) => a + b, 0))
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getItems()
    }, [cartItems])
    return (
        <Router className="App">
            <Header/>
            <ScrollToTop/>
          <div className="routes">
            <AnimatedRoutes/>
          </div>
            <Footer> </Footer>
        </Router>
    );
}

export default App;
