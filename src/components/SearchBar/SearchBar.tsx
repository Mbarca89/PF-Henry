import styles from './SearchBar.module.css'
import { FcSearch } from 'react-icons/fc'

const SearchBar = () => {
    return (
        <div className={styles.searchBar_container}>
            <FcSearch size={25} />
            <input type="text" placeholder='Buscar'/>
        </div>
    )
}
export default SearchBar;