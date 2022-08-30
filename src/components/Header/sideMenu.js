import React, {useState} from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion"
const SideMenu = ({config}) => {
const node = useClickOutside(()=>{config.setVisibility(false)})
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
    const [x, setX] = useState(-100);
    if (loading) return
    return (

          <div  >
              <motion.div className={"side-menu__bg"}
                          transition={{ type: "spring", duration: 0.5,when: 'afterChildren'  }}
                          initial={{ opacity: 0}}
                          animate={{ opacity: 1}}
                          exit={{ opacity: 0}}

              >


                  <motion.div ref={node}  className={"side-menu"}
                              initial={{ opacity: 0, x: -100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x:  -100 }}
                              transition={{ type: "spring", duration: 0.5  }}>
                      {config.width >= 500 && <h1>{config.sex === "women" ? "Dámské" : "Pánské"}</h1>}
                      {config.width <= 500 &&  <div className={"side-menu__header"}>
                          <button className={(config.sex === "men") && "button--checked"} onClick={(e)=>{
                              config.setSex("men")

                          }}>Pánské </button>
                          <button className={(config.sex === "women") && "button--checked"} onClick={(e)=>{
                              config.setSex("women")

                          }}>Dámské </button></div>}
                      {config.sex && <ul className={"side-menu__nav"}>
                          <motion.li  className={"side-menu__news"} onClick={()=> {
                              navigate("/")
                              config.setVisibility(false)
                          }}>Novinky</motion.li>

                          {categories.map((category)=>{
                              return(
                                  <li key={category.id} style={{cursor:"pointer"}} onClick={()=>{
                                      navigate(`./${config.sex}/${category.id}`,{replace:true});
                                      config.setVisibility(false)
                                  }}>{category.title}</li>
                              )
                          })}
                      </ul>}
                      {config.width <= 500 && <ul className={"side-menu__cartNav"}>
                          <li onClick={()=> {
                              navigate("/wishlist")
                              config.setVisibility(false)
                          }}>Oblíbené({config.wishlistItemsCount})</li>
                          <li onClick={()=> {
                              navigate("/cart")
                              config.setVisibility(false)
                          }}>Košík({config.cartItemsCount})</li>
                      </ul>}
                  </motion.div>
              </motion.div>

          </div>
    );
};

export default SideMenu;