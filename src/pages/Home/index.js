import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Item from "../../components/Item";
import {motion} from "framer-motion"
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import useDrag from "../../hooks/useDrag";
import usePreventBodyScroll from "../../hooks/usePreventBodyScroll";

const Home = () => {
    const [womenItems, setWomenItems] = useState([])
    const [womenItemsLoading, setWomenItemsLoading] = useState(true);

    const [menItems, setMenItems] = useState([]);
    const [menItemsLoading, setMenItemsLoading] = useState(true)

    const { disableScroll, enableScroll } = usePreventBodyScroll();
    // NOTE: for drag by mouse
    const {dragStart, dragStop, dragMove, dragging} = useDrag();
    const handleDrag = ({scrollContainer}) => (ev) =>
        dragMove(ev, (posDiff) => {
            if (scrollContainer.current) {
                scrollContainer.current.scrollLeft += posDiff;
            }
        });
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleByCategory/men`).then(response => {
            setMenItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setMenItemsLoading(false)
        })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/item/multipleByCategory/women`).then(response => {
            setWomenItems(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        }).then(() => {
            setWomenItemsLoading(false)
        })
    }, [])


    return (
        <motion.div
            className={"home"}

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="home__banner">

            </div>
            <div className="wrapper">
                {<div className="home__new-men">
                    <h2>Pánské novinky</h2>
                    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll} className="home__item-grid">
                        <ScrollMenu options={{ratio: 0.9,rootMargin: "0px",threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]}} onMouseDown={() => dragStart} onMouseUp={() => dragStop}  onWheel={onWheel}>
                            {!menItemsLoading && menItems.map((item, index) => {
                                return (
                                    <Item itemId={index} key={item.id} item={item}/>
                                )
                            })}
                        </ScrollMenu>

                    </div>

                </div>}
                {<div  className="home__new-women">
                    <h2>Dámské novinky</h2>
                    <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}  className="home__item-grid">

                        <ScrollMenu onWheel={onWheel}>
                            {!womenItemsLoading && womenItems.map((item) => {
                                return (
                                    <Item key={item.id} item={item}/>
                                )
                            })}
                        </ScrollMenu>
                    </div>
                </div>}
            </div>
        </motion.div>
    );
};

export default Home;

function onWheel(apiObj, ev) {
    const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isTouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY > 0) {
        apiObj.scrollNext();
        //const item = apiObj.getPrevItem();
        //apiObj.scrollToItem(item, "smooth", "start")
    } else if (ev.deltaY < 0) {
        apiObj.scrollPrev();
        //const item = apiObj.getNextItem();
        //apiObj.scrollToItem(item, "smooth", "end")
    }
}

function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
        const el = elRef.current;
        if (el) {

            const onWheel = e => {

                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + (e.deltaY * 3.35),
                    behavior: "smooth"
                });
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}