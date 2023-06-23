import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://pf-henry-back-two.vercel.app/categories"
        );
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(JSON.parse(storedUserName));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    categories && (
      <div className={styles.navbar_container}>
        <img
          src="/src/assets/logook.png"
          className={styles.navbar_logo}
          alt="logo"
          onClick={() => navigate("/home")}
        />
        <div className={styles.navbar_options}>
          {/* <select className={styles.navbar_button}>
            <option>Categorias</option>
            {   
              categories.map(categorie => {
                console.log(categorie);
                return (
                  <option key={categorie.id}>{categorie.categoryName}</option>
                )
              })
            }
          </select> */}
          {pathname !== "/products" && (
            <NavLink to="/products" className={styles.navbar_button}>
              Productos
            </NavLink>
          )}
          {/* <NavLink className={styles.navbar_button} to='/about'>Sobre Nosotros</NavLink> */}
        </div>
        <div>
          <p>{userName}</p>
        </div>
        <SearchBar />
        <div className={styles.navbar_icons}>
          {userName ? (
            <div className={styles.navbar_icon} onClick={handleLogout}>
              <BiLogIn size={50} />
              <span>Log out</span>
            </div>
          ) : (
            <div
              className={styles.navbar_icon}
              onClick={() => navigate("/login")}
            >
              <BiLogIn size={50} />
              <span>Ingresar</span>
            </div>
          )}
          <div className={styles.navbar_icon}>
            <AiOutlineShoppingCart size={50} />
            <span>Carrito</span>
          </div>
        </div>
      </div>
    )
  );
};

export default NavBar;
