import axios from "axios"
import { useEffect, useState } from "react"
import { RootState, useAppSelector } from '../../redux/store'
import styles from './Cart.module.css'

const Cart = () => {

    const { user } = useAppSelector((state: RootState) => state.user)
    const [cart,setCart] = useState([])

    console.log(user.id)

    useEffect(() => {
        const getCart = async () => {
            try {
               console.log(user.id);
               
                const {data} = await axios.get(`http://localhost:3000/cart/get/${user.id}`)
                setCart(data)
            } catch (error) {
                console.log(error)
            }
        }
        user.id && getCart()
    }, [user])

    console.log(cart)

    return (
        cart.length > 0 && <div className={styles.cart}>
            <h1>carrito</h1>
            {cart.map((product) => {
                return <div>{product}</div>
            })}
        </div>
    )
}

export default Cart