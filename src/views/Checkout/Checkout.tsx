import styles from './Checkout.module.css'
import { Key, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SiMercadopago } from 'react-icons/si'
import axios from 'axios';

const Checkout = () => {
    const {id} = useParams();
    const [order, setOrder] = useState([]);

    type Product = [{
        itemName: string;
        itemId: string;
        unityPrice: number;
        quantity: number;
        total: number;
      }];
      useEffect(() => {
        const getOrder = async () => {            
            const {data} = await axios.get(`http://185.253.153.34:3001/orders/${id}`)
            setOrder(data.productList)
        }
        getOrder();
      }, [id])

    const checkoutOk = async () => {
        try {
            const productList = order;
            const orderId = id;
            console.log(orderId);
            console.log(productList);
            
            const {data} = await axios.post('http://185.253.153.34:3001/checkout/create-order', {productList, orderId})
            window.location.href = data.init_point
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.checkout_container}>
            <h1>Tu pedido</h1>
            {order.map((item: {
                total: ReactNode;
                itemId: Key | null | undefined;
                itemName: ReactNode;
                unityPrice: ReactNode;
                quantity: ReactNode;
                product: Product
}) => {
                return (
                    <div className={styles.checkout_product} key={item.itemId}>
                        <h3>{item.itemName}</h3>
                        <p>${item.unityPrice}</p>
                        <p>{item.quantity}</p>
                        <p>${item.total}</p>
                    </div>
                )
            })}
            <button className={styles.checkout_btn} onClick={checkoutOk}>
                <SiMercadopago size={40}/>
                Realizar pedido
            </button>
        </div>
    )
}
export default Checkout