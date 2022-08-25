import React, {useRef} from 'react';
import './style.css'

const InputCheckboxColor = (props) => {
    const inputCheckbox = useRef(null)
    if(inputCheckbox === null) return (<p>loading</p>)
    return (
        <div>
            <label className={"checkbox__container"}>
                <input  ref={inputCheckbox} style={((inputCheckbox.current && inputCheckbox.current.checked) ? {background: props.options.name,color:"black"} : null)}   type="checkbox" value={props.options.value} name={props.options.name} onChange={props.options.onChangeEvent} defaultChecked={props.options.isDefaultChecked}/>
                {props.options.text}
            </label>
        </div>
    );
};

export default InputCheckboxColor;