import styles from '../Login/Login.module.css';
import axios from 'axios'
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  notifyError,
  notifySuccess,
} from "../../components/Toaster/Toaster.js";
import { REACT_APP_SERVER_URL } from "../../../config.ts";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { passwordToken } = useParams();
  const [form, setForm] = useState({
    password: "",
    passwordConfirmation: ''
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const validate = (
    form: any,
    errors: any,
    setErrors: (errorObj: any) => void
  ) => {
    let updatedErrors = { ...errors };

    if (form.password === "") {
      updatedErrors = {
        ...updatedErrors,
        password: "Ingresa la contraseña nueva",
      };
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
  const handlePassword = async () => {
    try {
      if(form.password === form.passwordConfirmation){
          const {data} = await axios.put(`${REACT_APP_SERVER_URL}/users/resetpassword/${passwordToken}`, {password: form.password})
          notifySuccess(data)
          navigate('/login')
      }
      else{
          notifyError('La contraseña no coincide')
      }
    } catch (error: any) {
      notifyError(error.response.data);
    }
  }
  return (
    <div className={styles.login_container}>
      <h1>Restablece tu contraseña</h1>
      <form className={styles.login_form}>
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
        <div className={styles.inputbox}>
          <input
            type="password"
            required={true}
            value={form.passwordConfirmation}
            onChange={handleChange}
            name="passwordConfirmation"
          />
          <span>Confirmar contraseña</span>
          <i></i>
        </div>
        <button type='button' onClick={handlePassword}className={styles.btn}>Restablecer contraseña</button>
        {errors.password && <span>{errors.password}</span>}
      </form>
    </div>
  );
};

export default ResetPassword;
