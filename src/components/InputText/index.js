import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

const InputText = (props) => {
    const [inputValue, setInputValue] = useState("")


    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if(!props.options.regexString) return ;

        if (props.options.regexString && !props.options.regexString.test(inputValue)) {
            props.options.setError(true);
        } else if(props.options.regexString ){
            props.options.setError(false);
        }
    },[inputValue]);
    useEffect(()=>{
        setInputValue(props.options.initialValue)
        props.options.setParentValue(props.options.initialValue)
    },[])
    return (
    <div>
        <input type="text" value={inputValue} placeholder={props.options.placeholder} onInput={(e)=>{
            setInputValue(e.currentTarget.value)
            props.options.setParentValue(e.currentTarget.value)
        }}  name={props.options.name} id={props.options.name}/>
        {props.options.error && <span>ERROOOR AAA PANIKA</span>}
    </div>
    );
};

export default InputText;