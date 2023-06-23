import styles from './Success.module.css'
import { FcApproval } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'

const Success = () => {
    return (
        <div className={styles.success_container}>
            <FcApproval size={250}/>
            <h2>Su orden se ha realizado exitosamente</h2>
            <NavLink to='/home' className={styles.success_btn}>Inicio</NavLink>
        </div>
    )
}
export default Success;