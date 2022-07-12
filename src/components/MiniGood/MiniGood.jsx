import React, {useState} from 'react';
import styles from './MiniGood.module.scss'

const MiniGood = (props) => {

    const info = JSON.parse(localStorage.getItem(props.id))
    const [count, setCount] = useState(info.count)


    return (
        <div className={styles.cartgood}>
            <img src="https://via.placeholder.com/300" alt=""/>
            <div className={styles.info}>
                <div className={styles.name}>{info.name}</div>
                <div className={styles.price}>{info.price}$</div>
                <div className={styles.count}>
                    <div className={styles.count__number}> Count: {count}</div>
                    <div className={styles.count__change}>
                        <div onClick={()=> {
                            props.changeCount(info.id, count, 1)
                            setCount(count + 1)

                        }}
                             className={styles.count__change_item}> </div>
                        <div onClick={()=> {
                            props.changeCount(info.id, count, -1)
                            count !==1 && setCount(count -1)
                        }}
                             className={styles.count__change_item}> </div>
                    </div>
                </div>
            </div>
            <div onClick={()=>props.remove(info.id)} className={styles.delete}>X</div>
        </div>
    );
};

export default MiniGood;