import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdHeight } from 'react-icons/md';

const NavBar = () => {
    interface Product {
        _id: string;
    }

    interface Category {
        categoryName: string;
        products: Product[];
        id: string;
    }
    const [categories, setCategories] = useState<Category[]>([]);
    const [showCategories, setShowCategories] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://pf-henry-back-two.vercel.app/categories');
                setCategories(response.data);

            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        }
        fetchCategories();
    }, [])
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const showCategoriesHandler = () => {
        setShowCategories(!showCategories)
    }

    return (
        categories &&
        <div className={styles.navbar_container}>
            <img src="/src/assets/logook.png" className={styles.navbar_logo} alt="logo" onClick={() => navigate('/home')} />
            <div className={styles.navbar_options}>
                <div className={styles.categorySelect}>
                    <button style={{cursor:'pointer'}} className={showCategories ? styles.navbar_button_active : styles.navbar_button} onClick={showCategoriesHandler}>Cagegorias</button>
                    <div className={styles.customSelect} style = {showCategories ? {opacity:1} : {opacity:0}}>
                        {
                            categories.map(category => {
                                return (
                                    <div key={category.id}>{category.categoryName}</div>
                                )
                            })
                        }
                    </div>
                </div>

                <NavLink to='/products' className={pathname === '/products' ? styles.navbar_button_active : styles.navbar_button}>Productos</NavLink>
                <NavLink className={pathname === '/about' ? styles.navbar_button_active : styles.navbar_button} to='/about'>Sobre Nosotros</NavLink>
            </div>
            <SearchBar />
            <div className={styles.navbar_icons}>
                <div className={styles.navbar_icon}>
                    <BiLogIn size={50} />
                    <span>Ingresar</span>
                </div>
                <div className={styles.navbar_icon}>
                    <AiOutlineShoppingCart size={50} />
                    <span>Carrito</span>
                </div>
            </div>
        </div>
    )
}
export default NavBar;