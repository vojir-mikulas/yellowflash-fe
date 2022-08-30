import React from 'react';
import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CartPreviewItem from "./cartPreviewItem";
import {motion} from "framer-motion"
const CartPreview = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const cartItems = useSelector((state) => state.cart.itemList)
    const price = useSelector((state) => state.cart.price)

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleById?ids=${cartItems.map(item => item.id).join(";")}`).then(response => {
            setItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    }, [])

    if (loading) return
    return (
        <motion.div className={"cart-preview modal"}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{ duration: 0.2 }}
                    exit={{opacity:0}}>

         <div>
             <h2>Váš košík</h2>
             <div className="cart-preview__item-container">
                 {
                     cartItems.map((cartItem)=>{
                         let itemData = items.find(item => item.id === cartItem.id)
                         return(
                             <CartPreviewItem key={itemData.id} item={{
                                 id: itemData.id,
                                 name: itemData.name,
                                 price: itemData.price * cartItem.quantity,
                                 image: itemData.images[0].url,
                                 size: cartItem.size,
                                 quantity: cartItem.quantity,
                             }}/>
                         )
                     })
                 }
             </div>
             <h2 className={"cart-preview__price"}>Celkem: {price} Kč</h2>
         </div>
            <button onClick={()=>
            navigate('/cart',{replace:true})}>Do Košíku</button>
        </motion.div>
    );
};

export default CartPreview;