import styles from './Products.module.css';
import Filters from '../../components/Filters/Filters';
import ProductsList from '../../components/ProductsList/ProductsList';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
//import { getProducts } from '../../redux/slices/productsSlice';
import { fecthProducts } from '../../redux/utils/fetchProducts';
//import axios from 'axios';
import { useEffect } from 'react';

const Products = () => {
    const dispatch = useAppDispatch()
    const { body } = useAppSelector((state: RootState) => state.products);
    const { products } = useAppSelector((state: RootState) => state.products);

    useEffect(() => {
        if(!products.length){
            dispatch(fecthProducts({
                page: '1',
                name: '',
                body
              }))
        }
    },[body, dispatch, products.length])


    return (
        <div className={styles.products_container}>
            <Filters />
            <ProductsList />
        </div>
    )
}
export default Products;