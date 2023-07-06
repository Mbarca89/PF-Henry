import styles from "./Login.module.css";
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
} from "../../components/Toaster/Toaster.js";
import { REACT_APP_SERVER_URL } from "../../../config.ts";

const Login = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [isRegistering, setIsRegistering] = useState(false);
  const [login, setlogin] = useState(
    isRegistering ? "Registro" : "Inicio de sesión"
  );
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
    if (isRegistering) setlogin("Registro");
    if (!isRegistering) setlogin("Inicio de sesión");
  }, [isRegistering]);

  useEffect(() => {
    if (token) navigate("/home");
    if (document.cookie) {
      const tokenCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("email="));
      const email = tokenCookie?.split("=")[1];
      const nameCookie = document.cookie
        .split(";")
        .find((name) => name.trim().startsWith("name="));
      const name = nameCookie?.split("=")[1];
      setIsRegistering(true);
      setForm({
        ...form,
        email: decodeURIComponent(email || ""),
        name: decodeURIComponent(name || ""),
      });
    }
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    role: "",
  });

  const validate = (
    form: any,
    errors: any,
    setErrors: (errorObj: any) => void
  ) => {
    let updatedErrors = { ...errors };

    if (form.postalCode === "") {
      updatedErrors = {
        ...updatedErrors,
        postalCode: "Ingresar código postal",
      };
    } else if (isNaN(form.postalCode)) {
      updatedErrors = {
        ...updatedErrors,
        postalCode: "El código postal debe ser un número",
      };
    } else {
      delete updatedErrors.postalCode; // Clear the error message for postalCode
    }

    if (form.province === "") {
      updatedErrors = { ...updatedErrors, province: "Ingresar provincia" };
    } else {
      delete updatedErrors.province; // Clear the error message for province
    }

    if (form.city === "") {
      updatedErrors = { ...updatedErrors, city: "Ingresar ciudad" };
    } else {
      delete updatedErrors.city; // Clear the error message for city
    }

    if (form.address === "") {
      updatedErrors = { ...updatedErrors, address: "Ingresar dirección" };
    } else {
      delete updatedErrors.address; // Clear the error message for address
    }

    if (form.name === "") {
      updatedErrors = { ...updatedErrors, name: "Ingresar nombre" };
    } else if (/\d/.test(form.name)) {
      updatedErrors = {
        ...updatedErrors,
        name: "El nombre no puede contener números",
      };
    } else {
      delete updatedErrors.name; // Clear the error message for name
    }

    if (form.email === "") {
      updatedErrors = {
        ...updatedErrors,
        email: "Ingresar correo electrónico",
      };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      updatedErrors = {
        ...updatedErrors,
        email: "Formato de correo electrónico inválido",
      };
    } else {
      delete updatedErrors.email; // Clear the error message for email
    }

    if (form.password === "") {
      updatedErrors = { ...updatedErrors, password: "Ingresar contraseña" };
    } else if (form.password.length < 6) {
      updatedErrors = {
        ...updatedErrors,
        password: "La contraseña debe tener al menos 6 caracteres",
      };
    } else {
      delete updatedErrors.password; // Clear the error message for password
    }

    setErrors(updatedErrors);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    const property = name; // Use the actual property name directly

    validate({ ...form, [property]: value }, errors, setErrors);

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
        res = await axios.post(`${REACT_APP_SERVER_URL}/auth/login`, formData);
        if (res.data) {
          if (!res.data.user.active) navigate("/notactive");
          else {
            const token = res.data.token;
            const userInfo = res.data.user;
            // Store token and userName in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userData", JSON.stringify(userInfo));

            window.location.reload();
          }
        }
      } else {
        res = await axios.post(
          `${REACT_APP_SERVER_URL}/users/register`,
          formData
        );
        notifySuccess("Registro exitoso");

        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 800);
      }
    } catch (error:any) {
      notifyError(error.response.data);
    }
  };
  const handleForgotPassword = async () => {
    try {
      const {data} = await axios.put(`${REACT_APP_SERVER_URL}/users/forgotpassword`, {email: form.email});
      notifySuccess(data);
    } catch (error: any) {
      notifyError(error.response.data);
    }
  }
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
        {errors.email && <span>{errors.email}</span>}

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
        {errors.password && <span>{errors.password}</span>}

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
            {errors.name && <span>{errors.name}</span>}

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
            {errors.address && <span>{errors.address}</span>}

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
            {errors.city && <span>{errors.city}</span>}

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
            {errors.province && <span>{errors.province}</span>}

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
            {errors.postalCode && <span>{errors.postalCode}</span>}
          </>
        )}
        {login === 'Inicio de sesión' && <button type="button" onClick={handleForgotPassword} className={styles.forgot}>Olvidé mi contraseña</button>}
        <div className={styles.login_btn}>
          {isRegistering && (
            <button onClick={() => setIsRegistering(false)} type="button">
              Iniciar Sesión
            </button>
          )}
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
      <a href={`${REACT_APP_SERVER_URL}/auth/google`}>
        <button className={styles.google_login}>
          <FcGoogle size={25} />
          INGRESAR CON GOOGLE
        </button>
      </a>
    </div>
  );
};

export default Login;
