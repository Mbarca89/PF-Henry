import styles from './Filters.module.css';
import { FcShipped, FcRating, FcHome, FcLike, FcAdvertising, FcMoneyTransfer, FcPositiveDynamic } from 'react-icons/fc';
import { GoChevronRight } from 'react-icons/go';
import {MdAttachMoney} from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { setBody, setName, setPage } from '../../redux/slices/productsSlice';
import { ChangeEvent, useState, useEffect } from 'react';
import { fecthProducts } from '../../redux/utils/fetchProducts';
import { Body } from '../../types';

const Filters = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { body } = useAppSelector(state => state.products);
  const urlName = useAppSelector(state => state.products.urlName)
  const urlPage = useAppSelector(state => state.products.urlPage)
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
    console.log(body);
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
    if(name === 'price'){
      setStateFiltered(
        {
          ...stateFiltered,
          sort:{
            ...stateFiltered.sort,
            price:{
              isSorted:true,
              order: value
            }
          }            
        })        
  }
  else if(name === 'sales'){
    setStateFiltered(
      {
        ...stateFiltered,
        sort:{
          ...stateFiltered.sort,
          sales:{
            isSorted:true,
            order: value
          }
        }            
      })        
}
if(name === 'relevant'){
  setStateFiltered(
    {
      ...stateFiltered,
      sort:{
        ...stateFiltered.sort,
        relevant:{
          isSorted:true,
          order: value
        }
      }            
    })        
}
  };
  const handleApplyFilters = () => {
    dispatch(setBody(stateFiltered));
    dispatch(fecthProducts({
      page: '1',
      name: urlName,
      body: stateFiltered
    }))
  };

  const handleResetFilters = () => {
    dispatch(setBody({
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
    }));
    dispatch(setPage('1'))
    dispatch(fecthProducts({
      page: '1',
      name: urlName,
      body: {
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
      }
    }))
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
        <select name="sales" onChange={handleChangeSelect}>
          <option value="asc">Mayor venta</option>
          <option value="desc">Menor venta</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcMoneyTransfer size={25} />
        <select name="price" onChange={handleChangeSelect}>
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>
      <div className={styles.filters_option}>
        <FcPositiveDynamic size={25} />
        <select name="relevant" onChange={handleChangeSelect}>
          <option value="asc">Mayor puntuación</option>
          <option value="desc">Menor puntuación</option>
        </select>
      </div>
      <div className={styles.price_filters_option}>
        <MdAttachMoney size={25}/>
          <div className={styles.range_prize_container}>
            <input type='number' placeholder='Precio mínimo' value={stateFiltered.minPrice} name='minPrice' onChange={handlePrice}/>
            <input type='number' placeholder='Precio máximo' value={stateFiltered.maxPrice} name='maxPrice' onChange={handlePrice}/>
          </div>
      </div>
      <button className={styles.btn} onClick={handleApplyFilters}>Aplicar filtros</button>
      <button className={styles.btn} onClick={handleResetFilters}>Limpiar filtros</button>
    </div>
  );
};

export default Filters;