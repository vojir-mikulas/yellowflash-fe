import React, {useState} from 'react';
import axios from "axios";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import {useDispatch} from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";

const DiscountCode = (props) => {
    const node = useClickOutside(()=>{
        props.setVisibility(false)
    })
    const [inputValue, setInputValue] = useState("")
    const [isValid, setIsValid] = useState(false)
    const dispatch = useDispatch()
    const setDiscount = (name,amount) => {
        dispatch(billingInfoActions.setDiscount({
            name,
            amount
        }))
    }
    const validate = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/discountcode?id=${inputValue}`,).then(response => {
            if (response.data) {
                setIsValid(true)
                setTimeout(()=>{
                props.setVisibility(false)
                },1500)

                return setDiscount(response.data.id,response.data.discountAmount)

            }
            setIsValid(false)
            return setDiscount("",0)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }
    return (
       <div className={"dicount-modal__bg"}>
           <div ref={node} className={"discount-modal"}>
               <h1>Zadejte slevu</h1>
               <input type="text" onInput={(e) => {
                   setInputValue(e.currentTarget.value)
               }}/>
               {isValid && <div>Kód je platný</div>}
               {!isValid && <div>Kód je neplatný</div>}
               <button onClick={validate}>Použít</button>

           </div>
       </div>
    );
};

export default DiscountCode;