import styles from "./Login.module.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token);

  const [isRegistering, setIsRegistering] = useState(false);
  const [login, setLogin] = useState(isRegistering ? "Registro" : "Inicio de sesión");

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    role: "cliente",
  });
  useEffect(() => {
    if (token) navigate("/home");
    
    if(document.cookie){
      const tokenCookie = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith('email='));
        const email = tokenCookie?.split('=')[1]
        const nameCookie = document.cookie
        .split(';')
        .find(name => name.trim().startsWith('name='));
        const name = nameCookie?.split('=')[1]
      setIsRegistering(true);
      setForm({
        ...form,
        email: decodeURIComponent(email || ""),
        name: decodeURIComponent(name || "")
      }
      )
    }
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

  const handleLoginNormal = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
  
    const formData = {
      email: form.email,
      password: form.password,
      name: form.name,
      address: form.address,
      city: form.city,
      province: form.province,
      postalCode: form.postalCode,
      role: form.role,
    };
  
    try {
      let res;
      if (!isRegistering) {
        res = await axios.post("http://localhost:3000/auth/login", formData);
        if (res.data) {
          const token = res.data.token;
          const userInfo = res.data.user;
    
          // Store token and userName in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(userInfo));
    
          window.location.reload();
        }
      } else {
        res = await axios.post("http://localhost:3000/users/register", formData);
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className={styles.login_container}>
      <h1>{login}</h1>
      <form className={styles.login_form} onSubmit={handleLoginNormal}>
        <div className={styles.inputbox}>
          <input
            type="text"
            required={true}
            value={form.email}
            onChange={handleChange}
            name="email"
          />
          <span>Correo electrónico</span>
          <i></i>
        </div>
        <div className={styles.inputbox}>
          <input
            type="password"
            required={true}
            value={form.password}
            onChange={handleChange}
            name="password"
          />
          <span>Contraseña</span>
          <i></i>
        </div>
        {isRegistering && (
          <>
            <div className={styles.inputbox}>
              <input
                type="text"
                required={true}
                value={form.name}
                onChange={handleChange}
                name="name"
              />
              <span>Nombre</span>
              <i></i>
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                required={true}
                value={form.address}
                onChange={handleChange}
                name="address"
              />
              <span>Dirección</span>
              <i></i>
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                required={true}
                value={form.city}
                onChange={handleChange}
                name="city"
              />
              <span>Ciudad</span>
              <i></i>
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                required={true}
                value={form.province}
                onChange={handleChange}
                name="province"
              />
              <span>Provincia</span>
              <i></i>
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                required={true}
                value={form.postalCode}
                onChange={handleChange}
                name="postalCode"
              />
              <span>Código Postal</span>
              <i></i>
            </div>
          </>
        )}
        <div className={styles.login_btn}>
          {isRegistering && <button onClick={() => setIsRegistering(false)} type="button">Iniciar Sesión</button>}
          {isRegistering ? (
            <button type="submit">REGISTRARME</button>
          ) : (
            <button type="submit">INGRESAR</button>
          )}
          {!isRegistering && (
            <button onClick={() => setIsRegistering(true)}>REGISTRAR</button>
          )}
        </div>
      </form>
      <a href="http://localhost:3000/auth/google">
        <button className={styles.google_login}>
          <FcGoogle size={25} />
          INGRESAR CON GOOGLE
        </button>
      </a>
    </div>
  );
};

export default Login;
