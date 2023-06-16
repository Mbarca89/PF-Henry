import styles from './Products.module.css';
import Filters from '../../components/Filters/Filters';
import ProductsList from '../../components/ProductsList/ProductsList';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
//import { getProducts } from '../../redux/slices/productsSlice';
import { getProducts } from '../../redux/utils/fetchProducts';
//import axios from 'axios';
import { useEffect } from 'react';

const Products = () => {
    const dispatch = useAppDispatch()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { products } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        if(!products.length){
            getProducts();
            //dispatch(getProducts)
        }
    },[dispatch, products.length])

    const handleState = () => {
        getProducts();
    }

    return (
        <div className={styles.products_container}>
            <Filters />
            <ProductsList />
        </div>
    )
}
export default Products;