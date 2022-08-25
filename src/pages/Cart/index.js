import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import "./style.css"


const Index = () => {
    return (
        <main className={"cart cart--wrapper"}>
            <Outlet/>
        </main>
    );
};

export default Index;