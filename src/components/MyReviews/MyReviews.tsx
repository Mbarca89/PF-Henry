import styles from './MyReviews.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { REACT_APP_SERVER_URL } from '../../../config.ts'
import { AiFillStar } from 'react-icons/ai';
import { notifyError, notifySuccess } from '../Toaster/Toaster.ts';
import { current } from '@reduxjs/toolkit';


const MyReviews = () => {

    const [reviews, setReviews] = useState([{
        product: {
            name: '',
            price: 0,
            description: '',
            photos: [{
                url: ''
            }],
            id: '',
            reviews: [{
                user: '',
                rating: 0,
                review: ''
            }]
        },
        reviewed: false
    }])
    const [update, setUpdate] = useState(false)
    const [userData, setUserData] = useState('');
    const [showReview, setShowReview] = useState(false)
    const [currentReview, setCurrentReview] = useState({
        productId: '',
        userId: '',
        rating: 0,
        review: ''
    })

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            const storedUserDataOk = JSON.parse(storedUserData)
            setUserData(storedUserDataOk.id);
        }
    }, []);

    useEffect(() => {
        const getReviews = async () => {
            if (userData) {
                const { data } = await axios(`${REACT_APP_SERVER_URL}/users/purchasedproducts/${userData}`)
                setReviews(data)
            }
        }
        getReviews()
        setCurrentReview({
            ...currentReview,
            userId:(userData)
        })
    }, [userData, update])

    const handleRating = (value: number) => {
        setCurrentReview({
            ...currentReview,
            rating: value
        })
    }

    const showReviewHandler = (id:any) => {
        setShowReview(!showReview)
        setCurrentReview({
            ...currentReview,
            productId: id,
        })
    }

    const cancelReview = () => {
        setShowReview(false)
        setCurrentReview({
            ...currentReview,
            productId: '',
            rating: 0,
            review: ''
        })
    }

    const postReview = async () => {
        try {
            const {data} = await axios.post(`${REACT_APP_SERVER_URL}/products/postreview`,currentReview)
            notifySuccess(data)
            cancelReview()
            setUpdate(!update)
        } catch (error:any) {
            notifyError(error.response.data)
        }
    }

    const changeHandler = (event:any) => {
        setCurrentReview({
            ...currentReview,
            [event.target.name]: event.target.value
        })
    }

    return reviews.length > 0 ? (
        <div className={styles.myReviews}>
            {reviews.map((review, index) => {
                return (
                    !review.reviewed && <div key={index} className={styles.review} style={showReview ? { opacity: .5 } : { opacity: 1 }}>
                        <img src={review.product.photos[0]?.url} alt="" />
                        <div className={styles.review_info}>
                            <h4>{review.product.name}</h4>
                            <p>{review.product.description}</p>
                        </div>
                        <button onClick={() => showReviewHandler(review.product.id)}>Escribir Reseña</button>
                    </div>
                )
            })}
            {showReview && <div className={styles.write_review}>
                <button onClick={cancelReview} className={styles.close}>X</button>
                <h4>Deja tu reseña:</h4>
                <textarea name="review" id="" value={currentReview.review} onChange={changeHandler}></textarea>
                <h4>Puntuacion:</h4>
                <div className={styles.stars}>
                    <button onClick={() => handleRating(1)} className={styles.star} >
                        <AiFillStar style={currentReview.rating >= 1 && { opacity: 1, color: 'gold' }}/>
                    </button>
                    <button onClick={() => handleRating(2)} className={styles.star} >
                        <AiFillStar style={currentReview.rating >= 2 && { opacity: 1, color: 'gold' }}/>
                    </button>
                    <button onClick={() => handleRating(3)} className={styles.star} >
                        <AiFillStar style={currentReview.rating >= 3 && { opacity: 1, color: 'gold' }}/>
                    </button>
                    <button onClick={() => handleRating(4)} className={styles.star} >
                        <AiFillStar style={currentReview.rating >= 4 && { opacity: 1, color: 'gold' }}/>
                    </button>
                    <button onClick={() => handleRating(5)} className={styles.star} >
                        <AiFillStar style={currentReview.rating >= 5 && { opacity: 1, color: 'gold' }}/>
                    </button>
                </div>
                <button className={styles.submitButton} onClick={postReview}>Aceptar</button>
            </div>}
        </div>
    ) : (
        <div>
            <h1>Ya has hecho una reseña de todas tus compras!</h1>
        </div>
    )
}

export default MyReviews