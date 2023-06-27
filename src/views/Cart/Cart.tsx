import axios from "axios"
import { useEffect, useState } from "react"
import styles from './Cart.module.css'
import { useNavigate } from 'react-router-dom'
import {notifyError, notifySuccess} from "../../components/Toaster/Toaster.js";

const Cart = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState('');
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState('');
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const storedUserDataOk = JSON.parse(storedUserData)
            setUserData(storedUserDataOk.id);
        }
    }, []);

    useEffect(() => {
        const getCart = async () => {
            try {
                if(userData){
                    const { data } = await axios.get(`http://185.253.153.34:3001/cart/get/${userData}`)
                    setCart(data.products)
                    setCartId(data.id)
                    setLoading(false)
                }
            } catch (error:any) {
                notifyError(error.response.data)
            }
        }
        getCart()
    }, [userData, update])

    const deleteProduct = async (productId: string) => {
        try {
            const {data} = await axios.delete(`http://185.253.153.34:3001/cart/remove?cartId=${cartId}&productId=${productId}`)
            setUpdate(!update)
            notifySuccess(data)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    const deleteAllProducts = async () => {
        try {
            const {data} = await axios.delete(`http://185.253.153.34:3001/cart/removeall/${cartId}`)
            setUpdate(!update)
            notifySuccess(data)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    const createOrder = async () => {
        try {
            const {data} = await axios.post('http://185.253.153.34:3001/orders',{user:userData,products:cart})
            const orderId = data.id
            navigate(`/order/${orderId}`)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    return !loading ? (
        cart.length > 0 ? <div className={styles.cart}>
            <h3>Mi carrito de compras</h3>
            <div className={styles.cart_container}>
                {cart.map((product: any, index: number) => {
                    return <div className={styles.cart_item_container} key={index}>
                        <div key={index} className={styles.cart_item}>
                            <div className={styles.img_container}>
                                <img src={product.product.photos[0]?.url} alt="" />
                            </div>
                            <div className={styles.name_container}>
                                <h3>{product.product.name}</h3>
                                <button onClick={() => deleteProduct(product.product.id)}>Eliminar</button>
                            </div>
                            <div className={styles.quantity_container}>
                                <input type="number" min='1' value={product.quantity} />
                                <p>{`Unidades disponibles:${product.product.stock}`}</p>
                            </div>
                            <div className={styles.price_container}>
                                <h5>{`$${product.price * product.quantity}`}</h5>
                            </div>
                        </div>
                        <hr />
                    </div>
                })}
                <div className={styles.button_container}>
                    <button onClick={createOrder}>Prodecer al Checkout</button>
                    <button onClick={deleteAllProducts}>Vaciar carrito</button>
                    <button onClick={() => navigate('/products')}>Seguir comprando</button>
                </div>
            </div>
        </div> :
            <div className={styles.cart}>
                <h3>Mi carrito de compras</h3>
                <div className={styles.cart_container}>
                    <h5>No has agregado ningun producto a tu carrito</h5>
                </div>
            </div>
    ):
    (<div className={styles.cart}>
        <h3>Mi carrito de compras</h3>
        <div  className={styles.loading}>
        <h4>Cargando...</h4>
        </div>
    </div>)
}

export default Cart