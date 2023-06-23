import styles from "./Login.module.css";
import axios from "axios";
import { ChangeEvent, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "../../redux/store";
import { setJWT } from "../../redux/slices/productsSlice";

const Login = () => {
  const dispatch = useAppDispatch()
  const [login, setLogin] = useState("Inicio de sesión");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedData = window.localStorage.getItem('token');
    console.log(storedData);
    if (storedData) {
      dispatch(setJWT(storedData))
    }
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const res = await axios.get("http://localhost:3000/auth/google");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*   const handleLoginNormal = async (event: { preventDefault: () => void }) => {
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
      console.log(res.data); // Log the response data



    } catch (error) {
      console.log(error);
    }
  }; */

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
      console.log(res.data); // Log the response data

      if (res.data) {
        const token = res.data.token;
        const userName = res.data.user.name;

        // Store token and userName in localStorage
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userName", JSON.stringify(userName));

        window.history.back();
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
            <button type="submit">REGISTRARSE</button>
          ) : null}
        </div>
      </form>
      <a href="http://localhost:3000/auth/google">
        <button>Click Me</button>
      </a>
      <button onClick={handleLogin}>
        <FcGoogle size={25} />
        INGRESAR
      </button>
    </div>
  );
};
export default Login;
