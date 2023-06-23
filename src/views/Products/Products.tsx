import styles from './Products.module.css';
import Filters from '../../components/Filters/Filters';
import ProductsList from '../../components/ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { fecthProducts } from '../../redux/utils/fetchProducts';
import { useEffect } from 'react';

const Products = () => {
    const dispatch = useAppDispatch()
    const { body } = useAppSelector((state: RootState) => state.products);
    const { products } = useAppSelector((state: RootState) => state.products);
    const urlName = useAppSelector(state => state.products.urlName)
    const urlPage = useAppSelector(state => state.products.urlPage)

    useEffect(() => {
        if (!products.length) {
            dispatch(fecthProducts({
                page: urlPage,
                name: urlName,
                body
            }))
        }
    }, [])

    return (
        <div className={styles.products_container}>
            <div className={styles.mainContainer}>
                <Filters />
                <ProductsList />
            </div>
            <div className={styles.paginationContainer}>
                <Pagination />
            </div>
        </div>
    )
}
export default Products;