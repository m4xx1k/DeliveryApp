import React from 'react';
import {Link, useMatch} from "react-router-dom";

const CustomLink = ({children, to}) => {
    const match = useMatch(to)
    const styles = {
        color: match ? "#5EDC98" : "#000",
        fontSize: match ? "36px" : "32px",
        margin: "0 20px"
    }
    return (
        <Link to={to} style={styles} >
            {children}
        </Link>
    );
};

export default CustomLink;