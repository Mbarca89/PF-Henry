import styles from './SearchBar.module.css'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { getProductsByName } from '../../redux/utils/fetchProducts';
import { FcSearch } from 'react-icons/fc'

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInput(event.target.value)
        if (pathname === '/home' || pathname === '/about') {
            navigate('/products')
        }
        console.log(input);
    }
    useEffect(() => {
        dispatch(getProductsByName(input))
        console.log(input);
        
    }, [dispatch, input])
    return (
        <div className={styles.searchBar_container}>
            <FcSearch size={25} />
            <input type="text" placeholder='Buscar' onChange={handleChange} value={input}/>
        </div>
    )
}
export default SearchBar;