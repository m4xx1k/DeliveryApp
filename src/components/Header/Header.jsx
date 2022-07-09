import React from 'react';
import styles from './Header.module.scss'
import CustomLink from "../CustomLink/CustomLink";

const Header = () => {
    return (
        <header className={styles.header}>
            <CustomLink to="/">Shops</CustomLink>
            <CustomLink to="/cart">Cart</CustomLink>
            <CustomLink to="/history">History</CustomLink>
        </header>
    );
};

export default Header;