import React, { useState, useEffect } from 'react';
import style from './Detail.module.css'
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    
    interface Product {
        name: string;
    }
      

    const [product, setProduct] = useState<Record<string, any>>({});


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getProduct = () => {
          axios.get(`https://pf-henry-back-two.vercel.app/products/detail/${id}`)
            .then(({ data }) => {
              if (data.name) {
                setProduct(data);
                setProgress(data.stock)
              } else {
                alert('No hay productos con ese ID');
              }
            })
            .catch((error) => {
              console.error('Error al obtener el producto:', error);
              alert('Hubo un error al obtener el producto');
            });
        };
        getProduct(); // Llamar a la función getProduct aquí para que se ejecute
      
      }, [id]);
      
    
    const [value, setValue] = useState<number | ''>(1);
    //barra de stock
    const [progress, setProgress] = useState(40);

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

        //calculo para la barra de stock
        const maxQuantity = 10;
        const currentProgress = (inputValue / maxQuantity) * 100;
        setProgress(currentProgress);
    };
    
    
    

    return(
        <div className={style.detail_container}>
            <div className={style.detail_img}>
                <img src={product.photos && product.photos[0].url} alt="" />
            </div>

            <div className={style.detail_container_description}>   
                <div className={style.title}>
                    <h2>{product.name}</h2>
                    <span> NABAT </span>
                </div>

                <div className={style.price}>
                    {product.hasDiscount && <h3 className={style.price_descuento}>{`$${product.price}`}</h3>}
                    {product.hasDiscount && <h1 className={style.price_real}> {`$${product.price * (100-product.discount) /100}`} </h1>}
                    {!product.hasDiscount && <h1 className={style.price_real}> {`$${product.price}`}</h1>}
                </div>

                <div className={style.container_progress}>
                    <h5>{progress} articulos restantes </h5>
                    <div className={style.progress_bar}>
                        <div className={style.progress_fill} style={{ width: `${progress}%` }}/>
                    </div>
                </div>
                

                <div className={style.description}>
                   <h4> Descripcion </h4>
                   <p> {product.description}</p> 
                </div>


                <div className={style.container_quantity}>
                    <h3> Cantidad </h3>

                    <div className={style.input_wrapper}>
                        <input type="number" className={style.input_field} value={value === '' ? '' : String(value)} onChange={handleChange} />
                        <button className={style.minus} onClick={decrement}>-</button>
                        <button className={style.plus} onClick={increment}>+</button>
                    </div>
                    <button className={style.buy}> Comprar Ahora </button>

                    <div className={style.buttons}>
                        <button className={style.cart}>
                            <AiOutlineShoppingCart size={20} />
                            Agregar al carrito
                        </button>
                        <button className={style.favoritos}>
                            <AiOutlineHeart size={20} />
                            Lista de deseos
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default Detail;