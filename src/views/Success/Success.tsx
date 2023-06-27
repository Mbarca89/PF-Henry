import styles from './Success.module.css'
import { FcApproval } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { notifyError } from '../../components/Toaster/Toaster'

const Success = () => {

    let cartId = ''

    useEffect(()=> {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const storedUserDataOk = JSON.parse(storedUserData)
            cartId = (storedUserDataOk.cart);
        }
        const cleanCart = async () => {
            try {
                await axios.delete(`http://185.253.153.34:3001/cart/removeall/${cartId}`)
            } catch (error:any) {
                notifyError(error.response.data)
            }
        }
        cleanCart()
    },[])

    return (
        <div className={styles.success_container}>
            <FcApproval size={250}/>
            <h2>Su orden se ha realizado exitosamente</h2>
            <NavLink to='/home' className={styles.success_btn}>Inicio</NavLink>
        </div>
    )
}
export default Success;