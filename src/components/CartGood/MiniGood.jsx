import React from 'react';
import styles from './MiniGood.module.scss'
import {useDispatch} from "react-redux";
import {changeCount, removeGood} from "../../store/CartSlice";

const MiniGood = ({info}) => {
    const dispatch = useDispatch();

    const changeCountButton = (num) => {
        if(info.count ===1 && num===-1) {} //pass
        else dispatch(changeCount({id: info.id, change: num}))
    }

    const removeGoodButton = () => {
        dispatch(removeGood({id:info.id}))
    }

    return (
        <div className={styles.cartgood}>
            <img src="https://via.placeholder.com/300" alt=""/>
            <div className={styles.info}>
                <div className={styles.name}>{info.name}</div>
                <div className={styles.price}>{info.price}$</div>
                <div className={styles.count}>
                    <div className={styles.count__number}> Count: {info.count}</div>
                    <div className={styles.count__change}>
                        <div onClick={()=>changeCountButton(1)}
                            className={styles.count__change_item}></div>
                        <div onClick={()=>changeCountButton(-1)}
                            className={styles.count__change_item}></div>
                    </div>
                </div>
            </div>
            <div onClick={removeGoodButton} className={styles.delete}>X</div>
        </div>
    );
};

export default MiniGood;