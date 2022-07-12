import React from 'react';
import styles from "./Good.module.scss"

const Good = ({info}) => {
    const addGoodSubmit = () => {
        const goodInfo = {...info, count: 1}
        localStorage.setItem(info.id.toString(), JSON.stringify(goodInfo))

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