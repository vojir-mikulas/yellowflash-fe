import React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion"

const CartToastItem = (props) => {
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/single/${props.item.id}`).then(response => {
            if(!response.data) navigate("../error")
            setItem(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);

        })},[])
    return (
       <AnimatePresence>
           { !loading &&<motion.div initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}} className={"cart-preview__item cart-toast__item modal"} onClick={() => {
               navigate(`/cart`, {replace: true})
           }}>
               <img
                   src={`${process.env.REACT_APP_SERVER_URL}/${item.images[0] ? item.images[0].url : "xd"}`}
                   alt={"preview"}/>
               <div className="cart-preview__item__desc">
                   <h2>Přidáno do košíku</h2>
                   <h2>{item.name}</h2>
                   <h2>{item.price} Kč</h2>
                   <div className="cart-preview__item__desc__details">
                       <span>Velikost: {props.item.size}</span> <br/>

                   </div>
               </div>
           </motion.div>}
       </AnimatePresence>
    );
};

export default CartToastItem;