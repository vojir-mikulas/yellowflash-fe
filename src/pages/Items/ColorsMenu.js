import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import capitalizeFirst from "../../utils/capitalizeFirst";
import {useParams, useNavigate, useLocation, useSearchParams} from "react-router-dom";
import InputCheckbox from "../../components/InputCheckbox";
import InputCheckboxColor from "../../components/InputCheckboxColor";


const ColorsMenu = (props) => {
    const [allColors, setAllColors] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        //todo: nehardcodovat url

        axios.get(`${process.env.REACT_APP_SERVER_URL}/colors`).then(response => {
            setAllColors(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }, [])

    const handleColorCheckboxChange = (e) => {
        let colors = searchParams.get("colors") ? searchParams.get("colors").split(";") : [];

        if (e.currentTarget.checked) {
            colors.push(e.currentTarget.value)
            colors = colors.sort((a, b) => (a - b)).join(";");
            searchParams.set("colors", colors);
            setSearchParams(searchParams)
            return
        }
        let index = colors.indexOf(e.currentTarget.value);
        if (index !== -1) colors.splice(index, 1);
        colors = colors.sort((a, b) => (a - b)).join(";")
        searchParams.set("colors", colors);
        setSearchParams(searchParams)

        if (colors === "") {
            searchParams.delete("colors")
            setSearchParams(searchParams)
        }
    }
    return (
        <div className={"filter__menu " + (props.visible ? "filter__menu--visible" : "")}>
            <div className="filter__checkbox-container">


                {allColors.map((color) => (
                    <InputCheckboxColor key={color.id} options={{
                        text: capitalizeFirst(color.name),
                        value: color.id,
                        name: color.name,
                        onChangeEvent: (e)=>{handleColorCheckboxChange(e)},
                        isDefaultChecked: searchParams.get("colors") ? searchParams.get("colors").split(";").includes(color.id.toString()) : false,
                    }}/>
                ))}
            </div>
        </div>
    );
};

export default ColorsMenu;