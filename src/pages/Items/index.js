import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation, useSearchParams} from "react-router-dom";
import ColorsMenu from "./ColorsMenu";
import SizesMenu from "./SizesMenu";
import PriceRangeMenu from "./PriceRangeMenu";
import axios from "axios";
import Item from "../../components/Item/index";
import Filters from "./Filters";
import {motion} from "framer-motion"
const Items = () => {
    const [items, setItems] = useState([]);
    const [categoryTitle,setCategoryTitle] = useState("");
    const [sexTitle,setSexTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const {sex, category} = useParams()
    let [requestString, setRequestString] = useState(`categories=${sex};${category}`);
    let [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const Filter = () => {
        let params = [];

        if (sex !== null && category !== null) params.push(`categories=${sex};${category}`)
        if (searchParams.get("highestPrice") !== null) params.push(`highestPrice=${searchParams.get("highestPrice")}`)
        if (searchParams.get("lowestPrice") !== null) params.push(`lowestPrice=${searchParams.get("lowestPrice")}`)
        if (searchParams.get("colors") !== null) params.push(`colors=${searchParams.get("colors")}`)
        if (searchParams.get("sizes") !== null) params.push(`sizes=${searchParams.get("sizes")}`)
        setRequestString(params.sort().join("&"))
    }
    useEffect(()=>{
        Filter();
    },[searchParams,sex,category])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/${sex}`).then(response => {
            if(!response.data) navigate("../error")
            setSexTitle(response.data.title)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
        axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/${category}`).then(response => {
            if(!response.data) navigate("../error")
            setCategoryTitle(response.data.title)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item?${requestString}`).then(response => {
           
            setItems(response.data)

        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(()=>{setLoading(false) } )
    }, [requestString])
    if(loading === true) return (<div><h1>loading</h1></div>)
    return (
        <motion.div  initial={{opacity:0}}
                     animate={{opacity:1}}
                     exit={{opacity:0}}>
            <Filters category={categoryTitle} sex={sexTitle}/>

            <main className="wrapper item--grid">

                {items.map((item) => {
                    return (
                        <Item key={item.id} item={item}/>
                    )
                })}
                {(items.length === 0) &&<h2>Nebyli nalezeny ??adn?? polo??ky...</h2>}
            </main>
        </motion.div>
    );
};

export default Items;