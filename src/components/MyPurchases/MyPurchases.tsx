import styles from './MyPurchases.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const MyPurchases = () => {

    const [user, setUser] = useState('')
    const [orders, setOrders] = useState([{
        id: '',
        orderDate: '',
        productList: [{
            itemName: '',
            quantity: 0,
            total: 0,
            unityPrice: 0
        }],
        totalOrderAmount: 0
    }])

    useEffect(() => {
        const stringUser = localStorage.getItem('userData')
        if (stringUser) {
            const userOk = JSON.parse(stringUser)
            setUser(userOk.id)
        }
        const getOrders = async () => {
            try {
                console.log(user)
                const { data } = await axios.get(`http://localhost:3000/orders/user/${user}`)
                console.log(data)
                setOrders(data)
            } catch (error) {
                console.log(error)
            }
        }
        user && getOrders()
    }, [user])

    console.log(orders)

    return (
        orders && <div className={styles.myPurchases}>
            <h1>Mis Compras</h1>
            <div className={styles.order_container}>
                {orders.map((order, index) => {
                    const date = new Date(order.orderDate);

                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    return <div key={index} className={styles.order}>
                        <div className={styles.order_info}>
                            <h5>{`Orden: ${order.id}`}</h5>
                            <h5>{`creada el dia: ${formattedDate}`}</h5>
                        </div>
                        <hr />
                        <div>
                            <h4>Productos:</h4>
                            {order.productList.map((product) => {
                            return <h5>{product.itemName}</h5>
                        })}</div>
                        <hr />
                        <h5>{`Monto total: ${order.totalOrderAmount}`}</h5>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MyPurchases