import styles from './ProductsList.module.css';
import { RootState, useAppSelector, useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getProducts } from '../../redux/utils/fetchProducts';
import { NavLink } from 'react-router-dom';

const ProductsList = () => {
    const { products } = useAppSelector((state: RootState) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])

    return (
        <div className={styles.productsList_container}>
            {products.map((product) => (
                <div key={product.name} className={styles.productsList_item}>
                    <img src={product.photos[0].url} alt="" />
                    <NavLink to={`${product.id}`} >
                        <h2>{product.name}</h2>
                    </NavLink>
                    <p>${product.price}</p>
                    <button>Comprar</button>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
