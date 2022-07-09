import React from 'react';
import styles from "./Good.module.scss"
import {useDispatch} from "react-redux";
import {addGood} from "../../store/CartSlice";

const Good = ({info}) => {
    const dispatch = useDispatch();
    const addGoodSubmit = () => {
        dispatch(addGood(info))
    }
    return (
        <div className={styles.good}>
            <img className={styles.img} src="https://via.placeholder.com/300" alt="img"/>
            <div className={styles.name}>{info.name}</div>
            <div className={styles.price}>{info.price}$</div>
            <button onClick={addGoodSubmit} className={styles.btn}> add 2 cart</button>
        </div>
    );
};

export default Good;