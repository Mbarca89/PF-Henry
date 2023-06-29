import styles from './NotActive.module.css'
import {FcCancel} from 'react-icons/fc'
import { useState } from 'react';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '../../../config.ts'
import { notifyError, notifySuccess } from '../../components/Toaster/Toaster';

const NotActive = () => {

    const [email,setEmail] = useState('')

    const changeHandler = (event:any) => {
        setEmail(event.target.value)
    }

    const send = async () => {
        try {
            const {data} = await axios.put(`${REACT_APP_SERVER_URL}/users/resendactivation`,{email})
            notifySuccess(data)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    return (
        <div className={styles.failure_container}>
            <FcCancel size={250}/>
            <h2>Tu cuenta no está activada! Sigue el enlace que enviamos a tu correo para activarla.</h2>
            <h3>Reenviar correo de activación</h3>
            <label htmlFor="email">Email</label>
            <input name='email' type="text" value={email} onChange={changeHandler}/>
            <button onClick={send}>Reenviar</button>
        </div>
    )
}
export default NotActive;