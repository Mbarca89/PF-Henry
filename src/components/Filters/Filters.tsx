import styles from './Filters.module.css'
import { FcShipped, FcRating, FcHome, FcLike, FcAdvertising} from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Filters = () => {
    const [rangePrice, setRangePrice] = useState();
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
                <FcLike size={25}/>
                <p>Favoritos</p>
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider}>
                    <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
                    </span>
                </label>
            </div>
            <div className={styles.filters_option}>
                <FcAdvertising size={25}/>
                <p>Ofertas</p>
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
            <div className={styles.filters_option}>
                <FcRating size={25}/>
                <div className={styles.range_prize_container}>
                    <label>Precio</label>
                    <input type="range" min="0" max="100" step="1" className={styles.range_prize}></input>
                </div>
            </div>
        </div>
    )
}
export default Filters;