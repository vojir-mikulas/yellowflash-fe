import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import OrderItem from "./OrderItem";
import {motion} from "framer-motion"
const OrderPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [order,setOrder] = useState({})
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true)
    const [shippingLoading,setShippingLoading] = useState(true)
    const [shipping,setShipping] = useState({});
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/order/${id}`).then(response => {
            if(!response.data ) navigate("../error")
            setOrder(response.data)
            if(response.data.items !== "") setItems(decodeItems(response.data.items))
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    },[])

    useEffect(()=>{
        if(!loading){
            axios.get(`${process.env.REACT_APP_SERVER_URL}/shipping/${order.shippingMethod}`).then(response => {
                setShipping(response.data)

            }).catch(error => {
                console.error("Error fetching data: ", error)
            }).then(() => {
                setShippingLoading(false);
            })
        }
    },[items])
    if(loading || shippingLoading) return;

    return (<motion.div className={"orderPage"}  initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}>
        <span style={{textAlign:"center"}}> YELLOWFLASH.COM <span className="slash">/</span> OBJEDNÁVKA <span className="slash">/</span>  {order.id}</span>
        <h1>DĚKUJEME ZA OBJEDNÁVKU!</h1>
        <span> Detail objednávky byl zaslán emailem</span>
        <div><h2>Status</h2> {order.status}</div>
        <div><h3>Dopravce</h3>{shipping.id}</div>
       <div>
           <h2>Shrnutí objednávky</h2>
           <div className={"orderPage__items"}>
               {items.map((item)=>{

                   return(
                       <OrderItem config={{
                           item:item,

                       }}/>
                   )
               })}
           </div>
           <div className={"orderPage__total"}>
               <span> Celkem:  </span>
               <span>{`${(order.amount / 100) - shipping.price} Kč`}</span>
           </div>
       </div>
    </motion.div>);

};

const decodeItems = (string) => {
    const items = [];
    const itemsInString = string.split(";")
    itemsInString.forEach((itemDataString)=>{
        const itemData =  itemDataString.split("%")
        const item = {
            id: itemData[0],
            quantity: itemData[1],
            size: itemData[2]
        }
        items.push(item)
    })
    return items
}

export default OrderPage;