import styles from './Filters.module.css';
import { FcShipped, FcRating, FcHome, FcLike, FcAdvertising, FcMoneyTransfer } from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go';
import { useAppDispatch } from '../../redux/store';
import { getProductsByFilter } from '../../redux/utils/fetchProducts';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

const Filters = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [stateFiltered, setStateFiltered] = useState({
    priceSorted: { isSorted: false, value: 'asc' },
    salesSorted: { isSorted: false, value: 'asc' },
    relevantSorted: { isSorted: false, value: 'asc' },
    freeShipping: false,
    hasDiscount: false,
    category: '',
    minPrice: '0',
    maxPrice: 'Infinity'
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setStateFiltered((prevState) => {
      return {
        ...prevState,
        [name]: checked
      };
    });
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if(name === 'priceSorted'){
        const newState = {
            priceSorted: {
                isSorted: true, value
            }
        }
        setStateFiltered((prevState) => {
            return {
              ...prevState,
              ...newState
            };
        });
        console.log(stateFiltered);
    }
    else if(name === 'salesSorted'){
        const newState = {
            salesSorted: {
                isSorted: true, value
            }
        }
        setStateFiltered((prevState) => {
            return {
              ...prevState,
              ...newState
            };
        });
        console.log(stateFiltered);
    }
    else if(name === 'relevantSorted'){
        const newState = {
            relevantSorted: {
                isSorted: true, value
            }
        }
        setStateFiltered((prevState) => {
            return {
              ...prevState,
              ...newState
            };
        });
        console.log(stateFiltered);
    }
  };

  const handleApplyFilters = () => {
    dispatch(getProductsByFilter(stateFiltered));
  };

  return (
    <div className={styles.filters_container}>
      <div className={styles.filters_option} onClick={() => navigate('/')}>
        <FcHome size={25} />
        <p>Inicio</p>
        <GoChevronRight size={25} style={{ color: 'black' }} />
      </div>
      <div className={styles.filters_option}>
        <FcShipped size={25} />
        <p>Envío gratis</p>
        <label className={styles.switch}>
          <input
            type="checkbox"
            name="freeShipping"
            onChange={handleChange}
            checked={stateFiltered.freeShipping}
          />
          <span className={styles.slider}>
            <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
              <path fill="none" d="m4 16.5 8 8 16-16"></path>
            </svg>
          </span>
        </label>
      </div>
      {/* <div className={styles.filters_option}>
        <FcLike size={25} />
        <p>Favoritos</p>
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={styles.slider}>
            <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
              <path fill="none" d="m4 16.5 8 8 16-16"></path>
            </svg>
          </span>
        </label>
      </div> */}
      <div className={styles.filters_option}>
        <FcAdvertising size={25} />
        <p>Ofertas</p>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleChange} checked={stateFiltered.hasDiscount} name="hasDiscount" />
          <span className={styles.slider}>
            <svg className={styles.slider_icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
              <path fill="none" d="m4 16.5 8 8 16-16"></path>
            </svg>
          </span>
        </label>
      </div>
      <div className={styles.filters_option}>
        <FcRating size={25} />
        <select name="salesSorted" onChange={handleChangeSelect} value={stateFiltered.salesSorted.value}>
          <option value="asc">Mayor venta</option>
          <option value="desc">Menor venta</option>
        </select>
        
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
        <select name="priceSorted" onChange={handleChangeSelect} value={stateFiltered.priceSorted.value}>
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
        <select name="relevantSorted" onChange={handleChangeSelect} value={stateFiltered.relevantSorted.value}>
          <option value="asc">Mayor puntuación</option>
          <option value="desc">Menor puntuación</option>
        </select>
      </div>
      <button onClick={handleApplyFilters}>Aplicar filtros</button>
    </div>
  );
};

export default Filters;
