import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Item from "../../components/Item";

const Home = () => {
    const [womenItems, setWomenItems] = useState([])
    const [womenItemsLoading,setWomenItemsLoading] = useState(true);

    const [menItems,setMenItems] = useState([]);
    const [menItemsLoading,setMenItemsLoading] = useState(true)

    const womenItemsNode = useHorizontalScroll();
    const menItemsNode = useHorizontalScroll();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleByCategory/men`).then(response => {
            setMenItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(()=>{setMenItemsLoading(false) } )

        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleByCategory/women`).then(response => {
            setWomenItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(()=>{setWomenItemsLoading(false) } )
    },[])


    return (
        <div className={"home"}>
            <div className="home__banner">

            </div>
             <div className="wrapper">
                 {<div className="home__new-men">
                     <h3>Pánské novinky</h3>
                     <div ref={menItemsNode}  className="home__item-grid">
                         {!menItemsLoading && menItems.map((item)=>{
                             return (
                                 <Item key={item.id} item={item}/>
                             )
                         })}
                     </div>
                 </div>}
                 {<div className="home__new-women">
                     <h3>Dámské novinky</h3>
                     <div ref={womenItemsNode} className="home__item-grid">
                         { !womenItemsLoading && womenItems.map((item)=>{
                             return (
                                 <Item key={item.id} item={item}/>
                             )
                         })}
                     </div>
                 </div>}
             </div>
        </div>
    );
};

export default Home;

function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {

            const onWheel = e => {

                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft +  (e.deltaY * 3.35)   ,
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}