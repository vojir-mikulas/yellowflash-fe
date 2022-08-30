import React from 'react';
import {motion} from "framer-motion"
const ErrorPage = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}>
            <img src="https://http.cat/404" alt=""/>
        </motion.div>
    );
};

export default ErrorPage;