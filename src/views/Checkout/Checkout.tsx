import styles from './Checkout.module.css'
import { SiMercadopago } from 'react-icons/si'

const Checkout = () => {
    return (
        <div className={styles.checkout_container}>
            <h1>Tu pedido</h1>
            <div className={styles.checkout_product}>
                <img src="/src/assets/LEGO_logo.svg" alt="" />
                <div className={styles.checkout_detail}>
                    <h3>Producto 3</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
                <p>$1500</p>
                <p>2</p>
                <p>Total: $1500</p>
            </div>
            <div className={styles.checkout_product}>
                <img src="/src/assets/LEGO_logo.svg" alt="" />
                <div className={styles.checkout_detail}>
                    <h3>Producto 3</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
                <p>$1500</p>
                <p>2</p>
                <p>Total: $1500</p>
            </div>
            <div className={styles.checkout_product}>
                <img src="/src/assets/LEGO_logo.svg" alt="" />
                <div className={styles.checkout_detail}>
                    <h3>Producto 3</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
                <p>$1500</p>
                <p>2</p>
                <p>Total: $1500</p>
            </div>
            <button className={styles.checkout_btn}>
                <SiMercadopago size={40}/>
                Realizar pedido
            </button>
        </div>
    )
}
export default Checkout