import styles from './Failure.module.css'
import { NavLink } from 'react-router-dom';
import {FcCancel} from 'react-icons/fc'

const Failure = () => {
    return (
        <div className={styles.failure_container}>
            <FcCancel size={250}/>
            <h2>Su orden fue cancelada</h2>
            <NavLink to='/home' className={styles.failure_btn}>Inicio</NavLink>
        </div>
    )
}
export default Failure;