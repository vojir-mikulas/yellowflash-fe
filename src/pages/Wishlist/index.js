import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import WishlistItem from "./wishlistItem";

const WishlistPage = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const wishlistItems = useSelector((state) => state.wishlist.itemList)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleById?ids=${wishlistItems.map(item => item.id).join(";")}`).then(response => {
            setItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    }, [wishlistItems])

    if (loading) return (<h1>loading...</h1>)
    return (
        <div>
            <span> YELLOWFLASH.COM / SEZNAM PŘÁNÍ</span>
            <h1>SEZNAM PŘÁNÍ</h1>
            <div>
                <div>
                    {items.map((item)=>{
                        return(
                            <WishlistItem key={item.id} item={item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;