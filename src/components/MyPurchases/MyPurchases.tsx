import { useState, useEffect } from 'react';
import styles from './MyPurchases.module.css';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '../../../config.ts'

interface Order {
  id: string;
  orderDate: string;
  productList: { itemId: string; itemName: string }[];
  totalOrderAmount: number;
}

const MyPurchases = () => {
  const [user, setUser] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const stringUser = localStorage.getItem('userData');
      if (stringUser) {
        const userOk = JSON.parse(stringUser);
        setUser(userOk.id);

        try {          
          const response = await axios.get(`${REACT_APP_SERVER_URL}/orders/user/${userOk.id}`);
          setOrders(response.data.reverse());

          const reviewedProductsResponse = await axios.get(`${REACT_APP_SERVER_URL}/users/purchasedproduct`);
          const reviewedProductsData = reviewedProductsResponse.data;
          const reviewedProductIds = reviewedProductsData.reviewedProducts.map((product: any) => product.itemId);
          setReviewedProducts(reviewedProductIds);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchOrders();
  }, []);

  const handleAddReview = async (productId: string, userId: string) => {
    if (reviewedProducts.includes(productId)) {
      alert('Ya has publicado una reseña para este producto.');
      return;
    }

    const review = prompt('Ingrese su comentario:');
    const ratingInput = prompt('Ingrese su puntuación (del 1 al 5):');
    const rating = ratingInput ? parseInt(ratingInput) : 0;

    if (review && rating && !isNaN(rating)) {
      const reviewData = {
        rating: rating,
        review: review,
        productId: productId,
        userId: userId,
      };
      console.log('Datos de la reseña:', reviewData);

      try {
        await axios.post(`${REACT_APP_SERVER_URL}/products/postreview`, reviewData);
        setReviewedProducts([...reviewedProducts, productId]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleProductChange = (productId: string) => {
    console.log('ID del producto seleccionado:', productId);
    setSelectedProduct(productId);
  };

  if (orders.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.myPurchases}>
      <h1>Mis Compras</h1>
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
              <div>
                <h4>Productos:</h4>
                {order.productList.map((product, productIndex) => (
                  <h5 key={productIndex}>{product.itemName}</h5>
                ))}
              </div>
              <hr />
              <h5>{`Monto total: ${order.totalOrderAmount}`}</h5>
              <select value={selectedProduct || ''} onChange={(e) => handleProductChange(e.target.value)}>
                <option value="">Seleccione un producto</option>
                {order.productList.map((product, productIndex) => (
                  <option key={productIndex} value={product.itemId}>
                    {product.itemName}
                  </option>
                ))}
              </select>
              <button disabled={!selectedProduct} onClick={() => handleAddReview(selectedProduct!, user)}>
                Agregar Reseña
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPurchases;
