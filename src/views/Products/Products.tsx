import styles from './Products.module.css';
import Filters from '../../components/Filters/Filters';
import ProductsList from '../../components/ProductsList/ProductsList';
const Products = () => {
    return (
        <div className={styles.products_container}>
            <Filters />
            <ProductsList />
        </div>
    )
}
export default Products;