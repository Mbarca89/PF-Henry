import React, { useState } from 'react';
import style from './Detail.module.css'
import {AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai';




const Detail = () => {
    const [value, setValue] = useState<number | ''>(1);
    //barra de stock
    const [progress, setProgress] = useState(40);

    const increment = () => {
        setValue(nextValue => (Number(nextValue) + 1));
    };
  
    const decrement = () => {
        setValue(prevValue => {
            const newValue = Number(prevValue) - 1;
            return newValue >= 0 ? newValue : prevValue;
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
                <img src="/src/assets/detail.jpg" alt="" />
            </div>

            <div className={style.detail_container_description}>   
                <div className={style.title}>
                    <h2> Titulo del Producto </h2>
                    <span> NABAT </span>
                </div>

                <div className={style.price}>
                    <h3 className={style.price_descuento}>$9.99</h3>
                    <h1 className={style.price_real}> $2.99 </h1>
                </div>

                <div className={style.container_progress}>
                    <h5>{progress} articulos restantes </h5>
                    <div className={style.progress_bar}>
                        <div className={style.progress_fill} style={{ width: `${progress}%` }}/>
                    </div>
                </div>
                

                <div className={style.description}>
                   <h4> Descripcion </h4>
                   <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nisi, nemo deserunt, minus quo delectus sapiente at cumque cum non nostrum accusantium magnam nam, explicabo inventore quisquam omnis! Similique, at?</p> 
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