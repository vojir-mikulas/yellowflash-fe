import React from 'react';
import useClickOutside from "../../hooks/useClickOutside";

const CompositionDetails = (props) => {
    const node = useClickOutside(()=>{
        props.setVisibility(false)
    })
    return (
     <div className={"size-helper--bg"}>
         <div ref={node} className={"c-details--container"}>
            <div className="c-details">
                <h2>Složení</h2>
                <ul>
                    <li>Fit - Loose fit</li>
                    <li>Složení - Bavlna 100%</li>
                </ul>
                <button onClick={()=>{
                    props.setVisibility(false)
                }}>Zavřít</button>
            </div>

         </div>
     </div>
    );
};

export default CompositionDetails;