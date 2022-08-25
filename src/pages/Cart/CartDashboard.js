import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DiscountCode from "./DiscountCode";
import usePrice from "../../hooks/usePrice";
import axios from "axios";
import {billingInfoActions} from "../../redux/billingInfo-slice";
import {cartActions} from "../../redux/cart-slice";


const CartDashboard = (props) => {
    const discount = useSelector((state) => (state.billingInfo.discount.amount ? state.billingInfo.discount.amount : 0))
    const shipping = useSelector((state) => state.billingInfo.shipping)
    const price = useSelector((state) => state.cart.price)
    const [discountPanelVisibility,setDiscountPanelVisibility] = useState(false)
    return (
        <div>
            {discountPanelVisibility && <DiscountCode setVisibility={setDiscountPanelVisibility}/>}
            <div>
                <h4>Slevy</h4>
                <span onClick={()=>(setDiscountPanelVisibility(true))}>Uplatnit slevu</span>

            </div>
            <div>
                <span>Přihlaste se a využijte své personalizované nabídky.</span>
                <button>Přihlásit se</button>
            </div>
            <div>
                <div>
                    <div>
                        <span>Cena za objednávku</span>

                        <span>{Math.round(price * (1 - discount / 100))}Kč {(discount !== 0) &&
                            <span> -{discount}% SLEVA</span>}</span>
                    </div>
                    <div>
                        <span>Cena za dopravu</span>
                        <span>{parseInt(shipping.price)}Kč</span>
                    </div>
                </div>
                <div><span>Celkem</span>
                    <span>{Math.round(price * (1 - discount / 100)) + parseInt(shipping.price)}Kč</span></div>
                <button disabled={props.options.disabled} className={"cartButton"}
                        onClick={props.options.onClickEvent}>{props.options.text}</button>
            </div>
            <div>
                <p>Ceny a náklady na dopravu budou potvrzeny, až dojdete do sekce pokladna.</p>
                <p>Odstoupení od smlouvy do 30 dnů, poplatek za vrácení zboží. Přečtěte si více o vrácení zboží a
                    peněz</p>
            </div>
        </div>)

};


export default CartDashboard;