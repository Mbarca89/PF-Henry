import styles from './Pagination.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPage } from '../../redux/slices/productsSlice';
import { fecthProducts } from '../../redux/utils/fetchProducts';


const Pagination = () => {

    const dispatch = useAppDispatch()
    const urlName = useAppSelector(state => state.products.urlName)
    const body = useAppSelector(state => state.products.body)
    const productCount = useAppSelector(state => state.products.productCount)
    const productsPerPage = 12
    const pages = []

    const pageHandle:any = (page:string) => {
        dispatch(setPage(page))
        dispatch(fecthProducts({
            page: page,
            name: urlName,
            body: body
        }))
    }


    for (let i = 1; i <= Math.ceil(productCount / productsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            {pages.map((_page,index) => {
                return (
                    <button key={index} onClick={() => pageHandle(index+1)}>{index+1}</button>
                )
            })}
        </div>
    )
}

export default Pagination