import styles from './Activation.module.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { notifyError } from '../../components/Toaster/Toaster.ts'
import {REACT_APP_SERVER_URL} from '../../../config.ts'
import { useParams } from 'react-router-dom'
import { FcApproval, FcCancel } from 'react-icons/fc'

const Activation = () => {

    const {activationToken} = useParams()
    const [message,setMessage] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(()=> {
        const activate = async () => {
            try {
                const {data} = await axios.get(`${REACT_APP_SERVER_URL}/users/activate/${activationToken}`)
                setMessage(data)
                setSuccess(true)
            } catch (error:any) {
                notifyError(error.response.data)
                setMessage(error.response.data)
                setSuccess(false)
            }
        }
        activate()
    },[])

    return (
        success ? <div className={styles.success_container}>
            <FcApproval size={250}/>
            <h2>{message}</h2>
            <NavLink to='/home' className={styles.success_btn}>Inicio</NavLink>
        </div>:
        <div className={styles.failure_container}>
        <FcCancel size={250}/>
        <h2>{message}</h2>
        <NavLink to='/home' className={styles.failure_btn}>Inicio</NavLink>
    </div>
    )
}
export default Activation;