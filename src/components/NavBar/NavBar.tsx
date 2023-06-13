import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiLogIn} from 'react-icons/bi';

const NavBar = () => {
    return (
        <div className={styles.navbar_container}>
            <img src="/src/assets/LEGO_logo.svg" className={styles.navbar_logo} alt="logo" />
            <div className={styles.navbar_options}>
                <NavLink to='/products' className={styles.navbar_button}>Productos</NavLink>
                <button className={styles.navbar_button}>Favoritos</button>
                <button className={styles.navbar_button}>Sobre Nosotros</button>
            </div>
            <div className={styles.navbar_icons}>
                <div className={styles.navbar_icon}>
                    <BiLogIn size={50}/>
                    <span>Ingresar</span>
                </div>
                <div className={styles.navbar_icon}>
                    <AiOutlineShoppingCart size={50}/>
                    <span>Carrito</span>
                </div>
                
            </div>
        </div>
    )
}
export default NavBar;