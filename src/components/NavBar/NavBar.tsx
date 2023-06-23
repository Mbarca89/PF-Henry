import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { setUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';


const NavBar = () => {

    const dispatch = useAppDispatch()
    const { pathname } = useLocation();
    const navigate = useNavigate();

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
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                setCategories(response.data);

            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        }
        fetchCategories();
        if (document.cookie) {
            const tokenCookie = document.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith('token='));
            const token = tokenCookie?.split('=')[1]
            if (token) localStorage.setItem('token', token)
            const userCookie = document.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith('user='));
            if (userCookie) {
                const userJSON = decodeURIComponent(userCookie.split('=')[1]);
                const userOk = JSON.parse(userJSON)
                localStorage.setItem('userData', JSON.stringify(userOk))
                dispatch(setUser(userOk))
            }
        }
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {            
            const storedUserDataOk = JSON.parse(storedUserData)
            setUserName(storedUserDataOk.name);
        }

    }, [dispatch])

   

    const showCategoriesHandler = () => {
        setShowCategories(!showCategories)
    }

    const handleLogout = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        window.location.reload();
    };

    return (
        categories &&
        <div className={styles.navbar_container}>
            <img src="/src/assets/logook.png" className={styles.navbar_logo} alt="logo" onClick={() => navigate('/home')} />
            <div className={styles.navbar_items}>
                <div className={styles.navbar_options}>
                    <div className={styles.categorySelect}>
                        <button style={{ cursor: 'pointer' }} className={showCategories ? styles.navbar_button_active : styles.navbar_button} onClick={showCategoriesHandler}>Categorias</button>
                        <div className={styles.customSelect} style={showCategories ? { opacity: 1 } : { opacity: 0 }}>
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
                <div className={styles.navbar_search}>
                    <SearchBar />
                </div>

                <div className={styles.navbar_icons}>
                    {userName && <p>{`Hola ${userName}!`}</p>}
                    {userName && <div className={styles.navbar_icon} onClick={() => navigate('/myprofile')}>
                            <CgProfile size={25} />
                            <span>Mi perfil</span>
                        </div>}
                    {userName ? (
                        <div className={styles.navbar_icon} onClick={handleLogout}>
                            <BiLogIn size={25} />
                            <span>Salir</span>
                        </div>
                    ) : (
                        <div
                            className={styles.navbar_icon}
                            onClick={() => navigate("/login")}
                        >
                            <BiLogIn size={25} />
                            <span>Ingresar</span>
                        </div>
                    )}
                    <div className={styles.navbar_icon} onClick={() => navigate('/cart')}>
                        <AiOutlineShoppingCart size={25} />
                        <span>Carrito</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default NavBar;