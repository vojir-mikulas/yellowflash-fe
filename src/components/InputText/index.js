import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';

const InputText = (props) => {
    const [inputValue, setInputValue] = useState("")
    const [firstRender,setFirstRender] = useState(true)

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            setFirstRender(false);
        }
        if(!props.options.regexString) return ;

        if (props.options.regexString && !props.options.regexString.test(inputValue)) {
            props.options.setError(true);
        } else if(props.options.regexString ){
            props.options.setError(false);
        }
    },[inputValue]);
    console.log(props.options.regexString + props.options.name)
    useEffect(()=>{
        setInputValue(props.options.initialValue)
        props.options.setParentValue(props.options.initialValue)
    },[])
    return (
    <div>
        <input  className={` ${props.options.regexString === undefined ? "input-default" : `${(props.options.error) ? "input--error" : "input--correct"}` }`} type="text" value={inputValue} placeholder={props.options.placeholder} onInput={(e)=>{
            setInputValue(e.currentTarget.value)
            props.options.setParentValue(e.currentTarget.value)
        }}  name={props.options.name} id={props.options.name}/>

    </div>
    );
};

export default InputText;