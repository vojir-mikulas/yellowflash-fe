import {useSearchParams} from "react-router-dom";
import {useEffect, useRef} from "react";

const PriceRangeMenu = (props) => {
    const lowestPriceInput = useRef(null)
    const highestPriceInput = useRef(null)

    let [searchParams, setSearchParams] = useSearchParams();

    const handleHighestPriceChange = (e) => {
        searchParams.set("highestPrice", highestPriceInput.current.value);
        setSearchParams(searchParams)
    }
    const handleLowestPriceChange = (e) => {
        searchParams.set("lowestPrice", lowestPriceInput.current.value);
        setSearchParams(searchParams)
    }
    useEffect(()=>{
        let highestPrice = searchParams.get("highestPrice") ? searchParams.get("highestPrice") : null;
        let lowestPrice = searchParams.get("lowestPrice") ? searchParams.get("lowestPrice") : null;

        highestPriceInput.current.value = highestPrice;
        lowestPriceInput.current.value = lowestPrice;

    },[])
    return (
        <div className={"filter__menu "+ (props.visible ? "filter__menu--visible" : "")}>
            <h3>highestPrice</h3>
            <input ref={highestPriceInput} onInput={handleHighestPriceChange} type="number" name="highestPrice" min={0}/>

            <h3>lowestPrice</h3>
            <input ref={lowestPriceInput} onInput={handleLowestPriceChange} type="number" name="lowestPrice" min={0}/>
        </div>
    );
};

export default PriceRangeMenu;

