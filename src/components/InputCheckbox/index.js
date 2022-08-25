import React from 'react';
import './style.css'

const InputCheckbox = (props) => {
    return (
        <div>
            <label className={"checkbox__container"}>
                <input type="checkbox" value={props.options.value} name={props.options.name} onChange={props.options.onChangeEvent} defaultChecked={props.options.isDefaultChecked}/>
                <span className="checkmark"></span>
                {props.options.text}
            </label>
        </div>
    );
};

export default InputCheckbox;