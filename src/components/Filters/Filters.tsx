import styles from './Filters.module.css';
import { FcShipped, FcRating, FcHome, FcLike, FcAdvertising, FcMoneyTransfer } from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { setBody } from '../../redux/slices/productsSlice';
import { ChangeEvent, useState, useEffect } from 'react';
import { Body } from '../../types';

const Filters = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { body } = useAppSelector(state => state.products);
  const [stateFiltered, setStateFiltered] = useState<Body>({
    sort: {
      price: { isSorted: false, order: 'asc' },
      sales: { isSorted: false, order: 'asc' },
      relevant: { isSorted: false, order: 'asc' },
    },
    freeShipping: false,
    hasDiscount: false,
    category: '',
    minPrice: '',
    maxPrice: 'Infinity'
  });
  useEffect(() => {
    console.log('body de estado global' ,body);
    setStateFiltered(body)
  }, [body])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setStateFiltered((prevState) => {
      return {
        ...prevState,
        [name]: checked
      };
    });

  };
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStateFiltered((prevState) => {
      return {
        ...prevState,
        [name]: value
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
    dispatch(setBody(stateFiltered));
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
        <select name="salesSorted" onChange={handleChangeSelect} value={stateFiltered.sort.sales.order}>
          <option value="asc">Mayor venta</option>
          <option value="desc">Menor venta</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
        <select name="priceSorted" onChange={handleChangeSelect} value={stateFiltered.sort.price.order}>
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
        <select name="relevantSorted" onChange={handleChangeSelect} value={stateFiltered.sort.relevant.order}>
          <option value="asc">Mayor puntuación</option>
          <option value="desc">Menor puntuación</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
          <div>
            <input type='number' placeholder='Precio mínimo' value={stateFiltered.minPrice} name='minPrice' onChange={handlePrice}/>
            <input type='number' placeholder='Precio máximo' value={stateFiltered.maxPrice} name='maxPrice' onChange={handlePrice}/>
          </div>
      </div>
      <button className={styles.btn} onClick={handleApplyFilters}>Aplicar filtros</button>
    </div>
  );
};

export default Filters;