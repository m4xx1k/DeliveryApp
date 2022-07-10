import React, {useState} from 'react';
import styles from "./History.module.scss"
import {useGetOrderByIdQuery, useGetOrdersByContactsQuery} from "../../store/deliveryApi";

const History = () => {

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})


    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError]= useState("")

    const [orderId, setOrderId] = useState('')
    const [orderIdError, setOrderIdError] = useState("")

    const [searchBy, setSearchBy] = useState('phone')

    const {
        data: ordersByPhone,
        isLoading: isLoadingOrdersByPhone,
        isSuccess: isSuccessOrdersByPhone
        } = useGetOrdersByContactsQuery(Number(phone))

    const {
        data: orderById,
        isLoading: isLoadingOrdersById,
        isSuccess: isSuccessOrdersById
        } = useGetOrderByIdQuery(Number(orderId))

    const findByPhone = async (e) => {

        e.preventDefault()


        const correctPhone = phone.split("").length === 12 && !isNaN(Number(phone))

        if (correctPhone){
            await setOrders(ordersByPhone)
            setSearchBy("phone")
            setPhoneError("")

        }
        else
        {
            setPhoneError("Invalid input")
            setOrders([])
        }
    }

    const findById = async (e) => {
        e.preventDefault()
        const correctOrderId = orderId.split("").length > 3  && orderId.split("").length < 7
        if (correctOrderId) {
            setOrderIdError("")
            await setOrder(orderById)
            setSearchBy("id")
        } else {
            setOrderIdError("Invalid input")
            setOrder({})
        }

    }

    return (
        <div className={styles.history}>


            <form>
                <div className={styles.title}> You can search your order by:</div>
                <label htmlFor="phone">Phone</label>
                <input type="phone"
                       name="phone"
                       onChange={(e) => setPhone(e.target.value)}
                       placeholder="380123456789"/>
                {phoneError && <div>{phoneError}</div>}


                <button onClick={(e) => findByPhone(e)} type="submit">Find</button>

                <div className={styles.title}>Or</div>

                <label htmlFor="orderId">Order ID</label>
                <input type="phone"
                       name="orderId"
                       value={orderId}
                       onChange={(e) => setOrderId(e.target.value)}
                       placeholder="12345"/>
                {orderIdError && <div>{orderIdError}</div>}


                <button onClick={(e) => findById(e)} type="submit">Find</button>
            </form>

            <div className={styles.orders}>
                {

                    searchBy === "phone" && !!orders ?
                        <div className={styles.orders_list}>
                            {
                                !isLoadingOrdersByPhone && isSuccessOrdersByPhone && orders.map((orderItem) =>
                                    <div className={styles.order} key={orderItem.id}>
                                        <div className={styles.orderId}> Order Id: <span>{orderItem.id}</span></div>
                                        <div className={styles.title}>User Info:</div>
                                        <div className={styles.userInfo}>
                                            <div>{orderItem.name}</div>
                                            <div>{orderItem.email}</div>
                                            <div>{orderItem.phone}</div>
                                        </div>

                                        <div className={styles.title}>Orders:</div>
                                        <div className={styles.goods}>
                                            {
                                                orderItem.goods.map((good) =>
                                                    <div key={good.id} className={styles.good}>
                                                        <img src="https://via.placeholder.com/300" alt="img"/>
                                                        <div>{good.name}</div>
                                                        <div>{good.price}$</div>
                                                        <div>Count: {good.count}</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className={styles.sum}>
                                            Total sum order:<span>{orderItem.totalSum}$</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :

                        <div>
                            {
                                !isLoadingOrdersById && isSuccessOrdersById && !!order &&
                                <div className={styles.order} key={order.id}>
                                    <div className={styles.orderId}> Order Id: <span>{order.id}</span></div>
                                    <div className={styles.title}>User Info:</div>
                                    <div className={styles.userInfo}>
                                        <div>{order.name}</div>
                                        <div>{order.email}</div>
                                        <div>{order.phone}</div>
                                    </div>

                                    <div className={styles.title}>Orders:</div>
                                    <div className={styles.goods}>
                                        {
                                            !!order.goods && order.goods.map((good) =>
                                                <div key={good.id} className={styles.good}>
                                                    <img src="https://via.placeholder.com/300" alt="img"/>
                                                    <div>{good.name}</div>
                                                    <div>{good.price}$</div>
                                                    <div>Count: {good.count}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.sum}>
                                        Total sum order:<span>{order.totalSum}$</span>
                                    </div>
                                </div>


                            }
                        </div>

                }
            </div>
        </div>
    );
};

export default History;