import React, { useState, useEffect } from 'react';
import style from './Detail.module.css'
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../components/Toaster/Toaster';
import { REACT_APP_SERVER_URL } from '../../../config.ts'

const Detail = () => {
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [product, setProduct] = useState<Record<string, any>>({});
    const [imageIndex, setImageIndex] = useState(0)
    const [userData, setUserData] = useState('');

    let user = ''
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const storedUserDataOk = JSON.parse(storedUserData)
        user = storedUserDataOk.id
    }


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getProduct = () => {
            axios.get(`${REACT_APP_SERVER_URL}/products/detail/${id}`)
                .then(({ data }) => {
                    if (data.name) {
                        setProduct(data);
                        setProgress(data.stock)
                    }
                })
                .catch((error: any) => {
                    notifyError(error.response.data)
                });
        };
        getProduct(); // Llamar a la función getProduct aquí para que se ejecute
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const storedUserDataOk = JSON.parse(storedUserData)
            setUserData(storedUserDataOk.id);
        }
    }, [id]);


    const [value, setValue] = useState<number | ''>(1);
    //barra de stock
    const [progress, setProgress] = useState(0);

    const increment = () => {
        setValue(nextValue => (Number(nextValue) + 1));
    };

    const decrement = () => {
        setValue(prevValue => {
            const newValue = Number(prevValue) - 1;
            return newValue > 0 ? newValue : prevValue;
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        setValue(inputValue);
    };

    const addProduct = async () => {
        try {
            const { data } = await axios.post(`${REACT_APP_SERVER_URL}/cart/add`, { id, userId: user, quantity: value })
            notifySuccess(data)
            navigate('/cart')
        } catch (error: any) {
            notifyError(error.response.data)
        }
    }

    const ReviewComponent = ({ rating }: { rating: number }) => {
        const stars = Array.from({ length: rating }, (_, index) => <AiFillStar key={index} style={{ color: 'gold' }} />);

        return (
            <div>
                {stars}
            </div>
        );
    }

    const next = () => {
        if (imageIndex < (product.photos.length - 1)) {
            setImageIndex(imageIndex + 1)
        }
        if(imageIndex === (product.photos.length - 1)) {
            setImageIndex(0)
        }
    }

    const previous = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1)
        }
        if(imageIndex === 0) {
            setImageIndex(product.photos.length - 1)
        }
    }

    const createOrder = async () => {
        try {
            const {data} = await axios.post(`${REACT_APP_SERVER_URL}/orders`,{user:userData,products:[{product:product, quantity:value, price:product.price}]})
            const orderId = data.id
            navigate(`/order/${orderId}`)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    console.log(product)

    return (
        product.photos &&
        <>
            <div className={style.detail_container}>
                <div className={style.detail_img}>
                    <img className={style.main_img} src={product.photos[imageIndex]?.url} alt="" />
                    <div className={style.left} onClick={previous}> 〈 </div>
                    <div className={style.right} onClick={next}> 〉 </div>
                    <div className={style.previews}>
                        {product.photos.length >= 1 && product.photos.map((photo: any,index:number) => {
                            return <img src={photo.url} alt="" className={index === imageIndex ? style.selected : style.notSelected}/>
                        })}
                    </div>
                </div>

                <div className={style.detail_container_description}>
                    <div className={style.title}>
                        <h2>{product.name}</h2>
                    </div>

                    <div className={style.price}>
                        {product.hasDiscount && <h3 className={style.price_descuento}>{`$${product.price}`}</h3>}
                        {product.hasDiscount && <h1 className={style.price_real}> {`$${product.price * (100 - product.discount) / 100}`} </h1>}
                        {!product.hasDiscount && <h1 className={style.price_real}> {`$${product.price}`}</h1>}
                    </div>

                    <div className={style.container_progress}>
                        <h5>{progress} articulos restantes </h5>
                        <meter
                            value={progress}
                            max='500'
                            min='0'
                            low={100}
                            optimum={251}
                            high={250}
                            className={style.progress_bar}
                        />
                    </div>


                    <div className={style.description}>
                        <h4> Descripción: </h4>
                        <p> {product.description}</p>
                    </div>


                    <div className={style.container_quantity}>
                        <h3> Cantidad </h3>

                        <div className={style.input_wrapper}>
                            <input type="number" className={style.input_field} value={value === '' ? '' : String(value)} onChange={handleChange} />
                            <button className={style.minus} onClick={decrement}>-</button>
                            <button className={style.plus} onClick={increment}>+</button>
                        </div>
                        <button className={style.buy} onClick={createOrder}> Comprar Ahora </button>

                        <div className={style.buttons}>
                            <button className={style.cart} onClick={addProduct}>
                                <AiOutlineShoppingCart size={20} />
                                Agregar al carrito
                            </button>
                            {/* <button className={style.favoritos}>
                                <AiOutlineHeart size={20} />
                                Lista de deseos
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {product.reviews[0] && <div className={style.reviews_container}>
                <h2>Reseñas</h2>
                {
                    product.reviews.map((review: { user: string; rating: number; review: string; }) => {
                        return (
                            <div className={style.reviews_item} key={review.review}>
                                <div className={style.reviews_user}>
                                    <FaUserCircle />
                                    <p>{review.user}</p>
                                </div>
                                <ReviewComponent rating={review.rating} />
                                <p>{review.review}</p>
                            </div>
                        )
                    })
                }
            </div>}
        </>
    )
}

export default Detail;