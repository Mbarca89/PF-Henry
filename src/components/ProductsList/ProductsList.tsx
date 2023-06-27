import styles from './ProductsList.module.css';
import { RootState, useAppSelector } from '../../redux/store';
import { NavLink } from 'react-router-dom';

const ProductsList = () => {
    const { productsFiltered } = useAppSelector((state: RootState) => state.products);

    return (
        productsFiltered.length ? <div className={styles.productsList_container}>
            {productsFiltered.map((product) => (
                <div key={product.name} className={styles.productsList_item}>
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
                    <button>Comprar</button>
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
