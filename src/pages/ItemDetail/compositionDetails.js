import React from 'react';
import useClickOutside from "../../hooks/useClickOutside";

const CompositionDetails = (props) => {
    const node = useClickOutside(()=>{
        props.setVisibility(false)
    })
    return (
        <div ref={node} style={{position:"absolute"}}>
            <h2>Složení</h2>
            <ul>
                <li>Fit - Loose fit</li>
                <li>Složení - Bavlna 100%</li>
            </ul>
            <button onClick={()=>{
                props.setVisibility(false)
            }}>Zavřít</button>
        </div>
    );
};

export default CompositionDetails;