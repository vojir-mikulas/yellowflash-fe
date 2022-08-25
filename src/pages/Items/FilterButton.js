import React from 'react';

const FilterButton = (props) => {
    return (
        <button onClick={props.onClickEvent}   className={"filter__button" + (props.visible ? " filter__button--checked" : "")}>
            {props.text}
        </button>
    );
};

export default FilterButton;