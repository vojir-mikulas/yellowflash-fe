import React, {useRef, useState} from 'react';
import ColorsMenu from "./ColorsMenu";
import SizesMenu from "./SizesMenu";
import PriceRangeMenu from "./PriceRangeMenu";
import FilterButton from "./FilterButton";
import useClickOutside from "../../hooks/useClickOutside";
import {useParams} from "react-router-dom";

const Filters = (props) => {

    const colorsMenu = useRef(null)
    const [sizeVisibility, setSizeVisibility] = useState(false)
    const [colorVisibility, setColorVisibility] = useState(false)
    const [priceRangeVisibility, setPriceRangeVisibility] = useState(false)
    let sizesNode = useClickOutside(() => {
        setSizeVisibility(false)
    })
    let colorsNode = useClickOutside(() => {
        setColorVisibility(false)
    })
    let priceRangeNode = useClickOutside(() => {
        setPriceRangeVisibility(false)
    })

    return (
        <div className={"filter--wrapper"}>
            <div className={"wrapper filter__menu__items"}>
                <h2>{props.category}</h2>
                <div ref={colorsNode}>
                    <FilterButton onClickEvent={()=>{setColorVisibility(!colorVisibility)}} setColorVisibility={setColorVisibility} visible={colorVisibility} text={"Barva"}/>
                    <ColorsMenu   visible={colorVisibility}/>
                </div>
                <div ref={sizesNode}>
                    <FilterButton onClickEvent={()=>{setSizeVisibility(!sizeVisibility)}} setSizeVisibility={setSizeVisibility} visible={sizeVisibility} text={"Velikosti"}/>
                    <SizesMenu visible={sizeVisibility}/>
                </div>
                <div ref={priceRangeNode}>
                    <FilterButton onClickEvent={()=>{setPriceRangeVisibility(!priceRangeVisibility)}} setPriceRangeVisibility={setPriceRangeVisibility} visible={priceRangeVisibility} text={"Cena"}/>
                    <PriceRangeMenu visible={priceRangeVisibility}/>
                </div>
            </div>
        </div>
    );
};

export default Filters;