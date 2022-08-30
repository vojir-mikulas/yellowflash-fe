import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home/index";
import Items from "./pages/Items/index";
import ItemDetail from "./pages/ItemDetail/index";
import ErrorPage from "./pages/ErrorPage/index";
import Cart from "./pages/Cart";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store, persistor} from "./redux/store";
import {PersistGate} from 'redux-persist/integration/react'

import Header from "./components/Header";
import InputCheckbox from "./components/InputCheckbox";
import PaymentStatus from "./pages/PaymentStatus/index";
import CartPage from "./pages/Cart/CartPage";
import UserDataPage from "./pages/Cart/UserDataPage";
import CheckoutPage from "./pages/Cart/CheckoutPage";
import ShippingPage from "./pages/Cart/ShippingPage";
import OrderPage from "./pages/order";
import {useEffect} from "react";
import axios from "axios";
import CheckoutForm from "./pages/Cart/CheckoutForm";
import CheckoutStatus from "./pages/Cart/CheckoutStatus";
import WishlistPage from "./pages/Wishlist";
import {cartActions} from "./redux/cart-slice";
import Footer from "./components/Footer/Footer";


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

          <div className="routes">
              <Routes>
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
          </div>
            <Footer></Footer>
        </Router>
    );
}

export default App;
