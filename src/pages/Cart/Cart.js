import React, {useState} from 'react';
import styles from './Cart.module.scss'

import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {useSelector} from "react-redux";
import MiniGood from "../../components/CartGood/MiniGood";
import {useAddOrderMutation} from "../../store/deliveryApi";

import Swal from 'sweetalert2'

const Cart = () => {
    const cart = useSelector(state => state.cart.cart)//get cart from redux

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        adress: Yup.string()
            .min(8, 'Too Short!')
            .max(60, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().min(12, "Invalid phone").max(12, "Invalid phone").required('Required')
    });

    const totalSum = cart.reduce((pr, cur) => pr + cur.price * cur.count, 0)

    const [addOrder, {isError, isLoading, isSuccess}] = useAddOrderMutation();
    const [orderId, setOrderId] = useState(null)

    const FormSubmit = async (values) => {
        if (cart.length) {
            //check if in cart are items from different shops
            let check = true
            let pr = cart[0].shopName
            cart.forEach((elem) => {
                if (elem.shopName !== pr) check = false
                pr = elem.shopName
            })
            if (check) {

                const orderInfo = {
                    phone: values.phone,
                    email: values.email,
                    adress: values.adress,
                    name: values.name,
                    goods: cart,
                    totalSum: totalSum,
                    id: Math.floor(Math.random() * 1000000)
                }
                console.log(orderInfo)
                setOrderId(orderInfo.id)
                await addOrder(orderInfo)


            } else {
                Swal.fire(`U can order products only from one shop`,"", "error")
            }
        } else {
            Swal.fire("The Cart is Empty((","", "error")
        }

    }
    return (
        <>
            <div className={styles.cart}>
                <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        email: '',
                        adress: ''
                    }}
                    validationSchema={validation}
                    validateOnBlur
                    onSubmit={(values) => FormSubmit(values)}
                >
                    {({handleBlur, errors, touched, values, handleChange, handleSubmit}) =>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <label htmlFor="name">Name & Surname</label>
                            <input type="text"
                                   name="name"
                                   onBlur={handleBlur}
                                   value={values.name}
                                   onChange={handleChange}
                                   placeholder="Evgeniy Volnov"/>
                            {errors.name && touched.name ? (
                                <div className={styles.error}>{errors.name}</div>
                            ) : null}
                            <label htmlFor="adress">Adress</label>
                            <input type="text"
                                   name="adress"
                                   value={values.adress}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder="st. Pushkina, Kolotushkina"/>
                            {errors.adress && touched.adress ? (
                                <div className={styles.error}>{errors.adress}</div>
                            ) : null}
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   name="email"
                                   value={values.email}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="volnov@prankota.com"/>
                            {errors.email && touched.email ? (
                                <div className={styles.error}>{errors.email}</div>
                            ) : null}
                            <label htmlFor="phone">Phone</label>
                            <input type="phone"
                                   name="phone"
                                   value={values.phone}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="380123456789"/>
                            {errors.phone && touched.phone ? (
                                <div className={styles.error}>{errors.phone}</div>
                            ) : null}
                            <button onClick={handleSubmit} type="submit">Submit</button>
                        </Form>
                    }
                </Formik>

                <div className={styles.cart__list}>
                    {
                        cart.map((info) =>
                            <MiniGood info={info} key={info.id}/>
                        )
                    }
                    <div className={styles.sum}>Total sum: <span>{totalSum}$</span></div>

                </div>


            </div>
            <div className={styles.status}>
                {
                    isSuccess && !isError && <div>{`Wait for your order, order id: ${orderId}`}</div>
                }
                {
                    isError && !isLoading && <div>Something went wrong, try again</div>
                }
            </div>
        </>
    );
};

export default Cart;