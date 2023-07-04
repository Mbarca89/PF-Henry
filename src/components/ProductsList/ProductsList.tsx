import styles from './ProductsList.module.css';
import { RootState, useAppSelector } from '../../redux/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { notifyError } from '../Toaster/Toaster';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../../config';
import { useEffect, useState } from 'react';

const ProductsList = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState('');

    useEffect(()=>{
        const storedUserData = localStorage.getItem("userData");
            if (storedUserData) {
                const storedUserDataOk = JSON.parse(storedUserData)
                setUserData(storedUserDataOk.id);
            }
    },[])

    const createOrder = async (product:any) => {
        try {
            const {data} = await axios.post(`${REACT_APP_SERVER_URL}/orders`,{user:userData,products:[{product:product, quantity:1, price:product.price}]})
            const orderId = data.id
            navigate(`/order/${orderId}`)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    const { productsFiltered } = useAppSelector((state: RootState) => state.products);

    return (
        productsFiltered.length ? <div className={styles.productsList_container}>
            {productsFiltered.map((product,index) => (
                <div key={index} className={styles.productsList_item}>
                    <NavLink to={`${product.id}`}>
                        <img src={product.photos[0]?.url} alt="" />
                    </NavLink>
                    <NavLink to={`${product.id}`} className={styles.name}>
                        <h2>{product.name}</h2>
                    </NavLink>
                    <div className={styles.priceContainer}>
                        {product.hasDiscount && <p className={styles.price_descuento}>{`$${product.price}`}</p>}
                        {product.hasDiscount && <p className={styles.price_real}> {`$${product.price * (100 - product.discount) / 100}`} </p>}
                        {!product.hasDiscount && <p className={styles.price_real}> {`$${product.price}`}</p>}
                    </div>
                    <button onClick={()=> createOrder(product)}>Comprar</button>
                </div>
            ))}
        </div> :
            <div className={styles.notFound}>
                <h1>No se encontraron productos.</h1>
                <h2>Por favor cambie los parametros de busqueda</h2>
            </div>
    );
};

export default ProductsList;
