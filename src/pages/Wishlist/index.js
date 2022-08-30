import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import WishlistItem from "./wishlistItem";
import {motion} from "framer-motion"
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
        <motion.div className="wrapper"  initial={{opacity:0}}
             animate={{opacity:1}}
             exit={{opacity:0}}>
            <div className={"wishlist"}>
                <span> YELLOWFLASH.COM <span className="slash">/ </span> SEZNAM PŘÁNÍ</span>
                <h1>SEZNAM PŘÁNÍ</h1>
                <div>
                    <div className={"wishlist__item-grid"}>
                        {items.map((item)=>{
                            return(
                                <WishlistItem key={item.id} item={item}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WishlistPage;