import styles from "./Login.module.css";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  console.log(token)
  useEffect(()=> {
    if(token) navigate('/home')
  },[])

  const [login, setLogin] = useState("Inicio de sesión");

  const [tokenState, setTokenState] = useState({
    token: "",
    userInfo: "",
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      if (res.data) {
        const token = res.data.token;
        const userInfo = res.data.user;

        // Store token and userName in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userInfo));

        setTokenState({
          token,
          userInfo,
        });
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
          <span>Correo electronico</span>
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
        <div className={styles.login_btn}>
          {login === "Inicio de sesión" ? (
            <button type="submit">INGRESAR</button>
          ) : <button type="submit">REGISTRARME</button>}
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
