import React, {useState} from 'react';
import styles from "./Shops.module.scss"
import Good from "../../components/Good/Good";
import {useGetShopsQuery, useGetGoodsQuery} from "../../store/deliveryApi";


const Shops = () => {
    const [shop, setShop] = useState("MacDac")

    const {data: list_shops, isLoading: shopsIsLoading} = useGetShopsQuery();
    const {data: list_goods, isLoading: goodsIsLoading} = useGetGoodsQuery(shop)


    return (
        <div className={styles.shops}>
            {
                !shopsIsLoading && !!list_shops
                    ?
                    <section className={styles.shops__list}>
                        {
                            list_shops.map((data) =>
                                <div key={data.id}
                                     onClick={(e) => setShop(e.target.innerText)}
                                     className={`${styles.shops_item} ${data.name === shop ? styles.shops_item_active : ''}`}>
                                    {data.name}
                                </div>
                            )
                        }
                    </section>
                    : <></>
            }


            <section className={styles.shops__goods}>
                {
                    !goodsIsLoading && !!list_goods
                        ?
                        list_goods.map((data) =>
                            <Good key={data.id} info={data}/>
                        )
                        :
                        <></>
                }
            </section>
        </div>
    );
};

export default Shops;