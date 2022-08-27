import React from 'react';

const InputCheckboxShipping = (props) => {
    return (
        <div className={"shipping-checkbox"}>
            <div className={"shipping-checkbox--wrapper"}>
            <label className={"checkbox__container"}>
                <input type="radio" value={props.options.value} name={props.options.name} onChange={props.options.onChangeEvent} defaultChecked={props.options.isDefaultChecked}/>
            </label>
                <span className="checkmark"></span>
                <img src={props.options.logo} alt=""/>
                <span> {props.options.text}</span>
            </div>
            <span>{props.options.price} Kč</span>
        </div>
    );
};

export default InputCheckboxShipping;