import React, {useState} from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SideMenu = ({config}) => {
    const node = useClickOutside(()=>{
        config.setVisibility(false)
    })
    const [loading,setLoading] = useState(true)
    const [categories,setCategories] = useState("")
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/categories`).then(response => {
            setCategories(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setLoading(false);
        })
    }, [])
    const navigate = useNavigate()
    if(loading) return
    return (
        <div ref={node} style={{position:"absolute",bottom:0,top:0,background:"white",width:"300px",display:"flex",justifyContent:"center",zIndex:43}}>
            <ul>
                {categories.map((category)=>{
                return(
                    <li style={{cursor:"pointer"}} onClick={()=>{
                     navigate(`./${config.sex}/${category.id}`,{replace:true});
                     config.setVisibility(false)
                    }}>{category.title}</li>
                )
                })}
            </ul>
        </div>
    );
};

export default SideMenu;