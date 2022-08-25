import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import InputCheckbox from "../../components/InputCheckbox";

const SizesMenu = (props) => {
    const [allSizes, setAllSizes] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        //todo: nehardcodovat url
        axios.get(`${process.env.REACT_APP_SERVER_URL}/sizes?category=${props.category}`).then(response => {
            setAllSizes(response.data)
        }).catch(error => {
            console.error("Error fetching data: ", error)
        })
    }, [])

    const handleSizeCheckboxChange = (e) => {
        let sizes = searchParams.get("sizes") ? searchParams.get("sizes").split(";") : [];
        if (e.currentTarget.checked) {
            sizes.push(e.currentTarget.value)
            sizes = sizes.sort((a, b) => (a - b)).join(";");
            searchParams.set("sizes", sizes);
            setSearchParams(searchParams)
            return
        }
        let index = sizes.indexOf(e.currentTarget.value);
        if (index !== -1) sizes.splice(index, 1);
        sizes = sizes.sort((a, b) => (a - b)).join(";")
        searchParams.set("sizes", sizes);
        setSearchParams(searchParams)

        if (sizes === "") {
            searchParams.delete("sizes")
            setSearchParams(searchParams)
        }

    }
    return (
        <div className={"filter__menu " + (props.visible ? "filter__menu--visible" : "")}>
            <div className="filter__checkbox-container">
                {allSizes.map((size) => (
                    <InputCheckbox key={size.id} options={{
                        text: size.size,
                        value: size.size,
                        name: size.size,
                        onChangeEvent: (e) => {
                            handleSizeCheckboxChange(e)
                        },
                        isDefaultChecked: searchParams.get("sizes") ? searchParams.get("sizes").split(";").includes(size.size.toString()) : false,
                    }}/>
                ))}
            </div>
        </div>
    );
};

export default SizesMenu;