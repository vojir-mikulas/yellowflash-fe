import React from 'react';
import {useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const OrderPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [order,setOrder] = useState({})
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/order/${id}`).then(response => {
            if(!response.data) navigate("../error")
            setOrder(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    },[])
    if(loading) return <h2>loading...</h2>
    return <div>
        <h1>Děkujeme za objednávkuy</h1>
        <span>Jstě fakt SUPRA ale bez A 💛</span>
    </div>;

};

export default OrderPage;