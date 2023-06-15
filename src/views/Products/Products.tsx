import styles from './Products.module.css';
import Filters from '../../components/Filters/Filters';
import ProductsList from '../../components/ProductsList/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
//import { getProducts } from '../../redux/slices/productsSlice';
import { fetchProducts } from '../../redux/utils/fetchProducts';
//import axios from 'axios';
import { useEffect } from 'react';

const Products = () => {
    const dispatch = useDispatch()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {products} = useSelector((state: any) => state.products);

    useEffect(() => {
        if(!products.length){
            fetchProducts();
            //dispatch(getProducts)
        }
    },[dispatch, products.length])

    return (
        <div className={styles.products_container}>
            <Filters />
            <ProductsList />
        </div>
    )
}
export default Products;