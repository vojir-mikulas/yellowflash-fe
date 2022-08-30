import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const OrderItem = ({config}) => {
    const [item,setItem] = useState([]);
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/single/${config.item.id}`).then(response => {
            if(!response.data) navigate("../error")
            setItem(response.data)

        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    },[])
    if(loading) return
     
    return (
        <div className={"orderItem"}>
            <img className={"orderItem__img"}
                 src={`${process.env.REACT_APP_SERVER_URL}/${item.images ? item.images[0].url : "xd"}`} alt={"preview"}/>

            <div className={"orderItem__details"}>


                <div className={"orderItem__details_desc"}>
                    <h2 style={{cursor:"pointer"}} onClick={()=>{
                        navigate(`/${item.id}`,{replace:true})
                    }}>{item.name}</h2>
                    <div><h3>Velikost</h3> <span>{config.item.size}</span></div>

                    <div><h3>Množství</h3>
                            {config.item.quantity}
                    </div>

                </div>
            </div>
            <h2 className={"orderItem__price"}>{item.price} Kč</h2>
        </div>
    );
};

export default OrderItem;