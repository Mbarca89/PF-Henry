import styles from './Filters.module.css'
import { FcShipped, FcRating, FcHome,  } from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom';
const Filters = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.filters_container}>
            <div className={styles.filters_option} onClick={() => navigate('/')}>
                <FcHome size={25}/>
                <p>Inicio</p>
                <GoChevronRight size={25} style={{ color: 'black' }}/>
            </div>
            <div className={styles.filters_option}>
                <FcShipped size={25}/>
                <p>Envío gratis</p>
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}>
                    <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
                    </span>
                </label>
            </div>
            <div className={styles.filters_option}>
                <FcRating size={25}/>
                <p>Más vendidos</p>
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}>
                    <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
                    </span>
                </label>
            </div>
        </div>
    )
}
export default Filters;