import styles from "./NavBar.module.css";
import { Body } from "../../types";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/store";
import { notifyError } from "../../components/Toaster/Toaster.js";
import { setBody } from "../../redux/slices/productsSlice.js";
import { fecthProducts } from "../../redux/utils/fetchProducts.js";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
  const [stateFiltered, setStateFiltered] = useState<Body>({
    sort: {
      price: {
        isSorted: false,
        order: "asc",
      },
      sales: {
        isSorted: false,
        order: "asc",
      },
      relevant: {
        isSorted: true,
        order: "desc",
      },
    },
    freeShipping: false,
    hasDiscount: false,
    category: "",
    minPrice: "",
    maxPrice: Infinity,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error: any) {
        notifyError(error.response.data);
      }
    };
    fetchCategories();
    if (document.cookie) {
      const tokenCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const token = tokenCookie?.split("=")[1];
      if (token) localStorage.setItem("token", token);
      const userCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("user="));
      if (userCookie) {
        const userJSON = decodeURIComponent(userCookie.split("=")[1]);
        const userOk = JSON.parse(userJSON);
        localStorage.setItem("userData", JSON.stringify(userOk));
        dispatch(setUser(userOk));
      }
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      if (token) navigate("/home");
    }
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const storedUserDataOk = JSON.parse(storedUserData);
      setUserName(storedUserDataOk.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setStateFiltered({
      ...stateFiltered,
      category: event.target.value,
    });
    dispatch(setBody(stateFiltered));
    dispatch(
      fecthProducts({
        page: "1",
        name: "",
        body: stateFiltered,
      })
    );
    navigate("/products");
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
        <div className={styles.navbar_items}>
          <div className={styles.navbar_options}>
            {pathname !== "/products" && (
              <div className={styles.categorySelect}>
                <select
                  className={styles.customSelect}
                  onChange={(event) => handleSelect(event)}
                >
                  <option>Categorias</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <NavLink
              to="/products"
              className={
                pathname === "/products"
                  ? styles.navbar_button_active
                  : styles.navbar_button
              }
            >
              Productos
            </NavLink>
            <NavLink
              className={
                pathname === "/about"
                  ? styles.navbar_button_active
                  : styles.navbar_button
              }
              to="/about"
            >
              Sobre Nosotros
            </NavLink>
          </div>
          <div className={styles.navbar_search}>
            <SearchBar />
          </div>

          <div className={styles.navbar_icons}>
            {userName && <p>{`Hola ${userName}!`}</p>}
            {userName && (
              <div
                className={styles.navbar_icon}
                onClick={() => navigate("/myprofile")}
              >
                <CgProfile size={25} />
                <span>Mi perfil</span>
              </div>
            )}
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
            <div
              className={styles.navbar_icon}
              onClick={() => navigate("/cart")}
            >
              <AiOutlineShoppingCart size={25} />
              <span>Carrito</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default NavBar;
