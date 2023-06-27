import styles from './Home.module.css'
import Offers from '../../components/Offers/Offers';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [product, setProduct] = useState({
        name: '',
        description: '',
        ratingAverage: 0,
        photos: [{
            url: ''
        }]
    });
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getFeatured = async () => {
            try {
                const { data } = await axios.get('http://185.253.153.34:3001/products/featured')
                setProduct(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getFeatured()
    }, []);

    console.log(product)

    return (
        !loading && <>
            <div className={styles.home_container}>
                <div className={styles.home_product}>
                    <div className={styles.home_product_detail}>
                        <h1>{product.name}</h1>
                        <img src={product.photos[0]?.url} alt="" />
                        <p>{product.description}</p>
                        <div className={styles.rating}>
                            <AiFillStar size={16} style={product.ratingAverage >= 1 ? { opacity: 1 } : { opacity: 0 }}></AiFillStar>
                            <AiFillStar size={16} style={product.ratingAverage >= 2 ? { opacity: 1 } : { opacity: 0 }}></AiFillStar>
                            <AiFillStar size={16} style={product.ratingAverage >= 3 ? { opacity: 1 } : { opacity: 0 }}></AiFillStar>
                            <AiFillStar size={16} style={product.ratingAverage >= 4 ? { opacity: 1 } : { opacity: 0 }}></AiFillStar>
                            <AiFillStar size={16} style={product.ratingAverage >= 5 ? { opacity: 1 } : { opacity: 0 }}></AiFillStar>
                        </div>
                    </div>
                    <button className={styles.home_product_button}>Ver producto</button>
                </div>
                <img src="/src/assets/pngwing.com.png" alt="image_product" className={styles.homeImg} />
            </div>
            <Offers />
        </>
    )
}

export default Home;