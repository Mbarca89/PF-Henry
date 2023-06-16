import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiLogIn} from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    return (
        <div className={styles.navbar_container}>
            <img src="/src/assets/LEGO_logo.svg" className={styles.navbar_logo} alt="logo" onClick={() => navigate('/home')}/>
            <div className={styles.navbar_options}>
                <button className={styles.navbar_button}>Categorias</button>
                {pathname !== '/products' && <NavLink to='/products' className={styles.navbar_button}>Productos</NavLink>}
                <NavLink className={styles.navbar_button} to='/about'>Sobre Nosotros</NavLink>
            </div>
            <SearchBar />
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