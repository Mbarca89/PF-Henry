import styles from './About.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {REACT_APP_SERVER_URL} from '../../../config.ts'

const About = () => {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userData");
    if (storedUserName) {
      const storedUserNameOk = JSON.parse(storedUserName)
      setUserName(storedUserNameOk);
    }
  }, []);

    const productList = [
        {
          itemName: "crema para manos",
          unityPrice: 3700,
          quantity: 2,
          total: 7400
        },
        {
          itemName: "crema de enjuague",
          unityPrice: 3300,
          quantity: 3,
          total: 9900
        }
      ]
    
    // const checkout = async ()=> {
    //   const response = await fetch ('/create-order', {
    //      method: 'POST'
    //  })
    //   const data =  await response.json()
    //   console.log(data);
    //   window.location.href = data.init_point
    // }

    const checkoutOk = async () => {
        const {data} = await axios.post(`${REACT_APP_SERVER_URL}/checkout/create-order`, {productList})
        window.location.href = data.init_point
    }


    if (userName) {
    return (
        <div className={styles.about_container}>
            <h1>Sobre nosotros</h1>
            <button id="checkout" onClick={checkoutOk}>
                Pay
            </button>
        </div>
    )
    } else {
      return (
        <div>
          <span>Please login</span>
        </div>
      );
    }
}
export default About;