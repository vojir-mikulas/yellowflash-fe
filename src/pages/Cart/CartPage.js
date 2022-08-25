import CartItem from "./CartItem";
import CartDashboard from "./CartDashboard";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import cartItem from "./CartItem";

const CartPage = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const cartItems = useSelector((state) => state.cart.itemList)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const setShipping = (method,price) => {
        dispatch(billingInfoActions.setShipping({
            method,
            price
        }))
    }

    useEffect(() => {
        setShipping("",0)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleById?ids=${cartItems.map(item => item.id).join(";")}`).then(response => {
            setItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    }, [])

    if (loading) return (<h1>loading...</h1>)
    return (
        <>
            <span> YELLOWFLASH.COM / NAKUPNÍ KOŠÍK</span>
            <h1>NÁKUPNÍ KOŠÍK</h1>

            <div>
                <div>
                    {cartItems.map((cartItem) => {
                        let itemData = items.find(item => item.id === cartItem.id)
                        return (
                            <CartItem key={cartItem.id + cartItem.size} item={{
                                id: itemData.id,
                                name: itemData.name,
                                price: itemData.price * cartItem.quantity,
                                image: itemData.images[0].url,
                                size: cartItem.size,
                                quantity: cartItem.quantity,
                            }}/>
                        )
                    })}
                </div>
                <CartDashboard options={{
                    text: "Zadat adresu",
                    onClickEvent: (e) => {
                        e.preventDefault()
                        if(cartItems.length === 0) return
                        navigate("./userdata")
                    },
                    disabled: false
                }}/>
            </div>
        </>
    );
};

export default CartPage;