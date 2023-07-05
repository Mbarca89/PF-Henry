import styles from './SearchBar.module.css'
import { SetStateAction, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fecthProducts } from '../../redux/utils/fetchProducts';
import { FcSearch } from 'react-icons/fc'
import { setName } from '../../redux/slices/productsSlice';

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const body = useAppSelector(state => state.products.body)


    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInput(event.target.value)
        if (pathname !== '/products' ) {
            navigate('/products')
        }
    }

    const nameHandle = (event: any) => {
        if (event.key === 'Enter') {
            dispatch(setName(event.target.value))
            dispatch(fecthProducts({
                page: '1',
                name: event.target.value,
                body: body
            }))
        }
    }

    const nameResetHandle = () => {
        setInput('')
        dispatch(setName(''))
        dispatch(fecthProducts({
            page: '1',
            name: '',
            body: body
        }))
    }


    return (
        <div className={styles.searchBar_container}>
            <FcSearch size={25} onClick={nameHandle} />
            <input type="text" placeholder='Buscar' onChange={handleChange} value={input} onKeyDown={nameHandle} />
            {input !== '' && <p onClick={nameResetHandle}>X</p>}
        </div>
    )
}
export default SearchBar;