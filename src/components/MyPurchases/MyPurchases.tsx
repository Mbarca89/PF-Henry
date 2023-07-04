import { useState, useEffect } from 'react';
import styles from './MyPurchases.module.css';
import axios from 'axios';
import { REACT_APP_SERVER_URL } from '../../../config.ts'
import { notifyError } from '../Toaster/Toaster.ts';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  orderDate: string;
  productList: { itemId: string; itemName: string }[];
  totalOrderAmount: number;
}

const MyPurchases = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const stringUser = localStorage.getItem('userData');
      if (stringUser) {
        const userOk = JSON.parse(stringUser);

        try {
          const response = await axios.get(`${REACT_APP_SERVER_URL}/orders/user/${userOk.id}`);
          setOrders(response.data.reverse());
        } catch (error:any) {
          notifyError(error.response.data)
        }
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <div>No tienes productos comprados</div>;
  }
  return (
    <div className={styles.myPurchases}>
      <h1>Mis Ordenes</h1>
      <div className={styles.order_container}>
        {orders.map((order, index) => {
          const date = new Date(order.orderDate);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

          return (
            <div key={index} className={styles.order}>
              <div className={styles.order_info}>
                <h5>{`Orden: ${order.id}`}</h5>
                <h5>{`Creada el día: ${formattedDate}`}</h5>
              </div>
              <hr />
              <div className={styles.list_container}>
                <h4>Productos</h4>
                <div className={styles.list_products}>
                {order.productList.map((product, productIndex) => (
                  <h5 key={productIndex} onClick={() => navigate(`/products/${product.itemId}`)}>{product.itemName}</h5>
                ))}
                </div>
              </div>
              
              <h5 className={styles.price}>{`Monto total: $${order.totalOrderAmount}`}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPurchases;
