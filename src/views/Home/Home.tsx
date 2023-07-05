import styles from "./Home.module.css";
import Offers from "../../components/Offers/Offers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { REACT_APP_SERVER_URL } from "../../../config.ts";
import { notifyError } from "../../components/Toaster/Toaster.ts";
import logo from "../../assets/pngwing.com.png";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    description: "",
    ratingAverage: 0,
    photos: [
      {
        url: "",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getFeatured = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_SERVER_URL}/products/featured`
        );
        setProduct(data);
        setLoading(false);
      } catch (error: any) {
        notifyError(error.response.data);
      }
    };
    getFeatured();
  }, []);

  return (
    !loading && (
      <>
        <div
          className={styles.home_container}
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={styles.home_product}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <div className={styles.home_product_detail}>
              <h1>Producto destacado</h1>

              <img
                src={product.photos[0]?.url}
                alt=""
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                  /*     border: "4px solid white", */
                }}
              />
              <h2 className={styles.h2}>{product.name}</h2>
              <p>{product.description}</p>
              <div
                className={styles.rating}
                style={{
                  backgroundColor: "white",
                  width: "346.260px",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "1em",

                  /*     border: "4px solid white", */
                }}
              >
                <AiFillStar
                  size={16}
                  style={
                    product.ratingAverage >= 1
                      ? { opacity: 1, color: "gold" }
                      : { opacity: 0 }
                  }
                ></AiFillStar>
                <AiFillStar
                  size={16}
                  style={
                    product.ratingAverage >= 2
                      ? { opacity: 1, color: "gold" }
                      : { opacity: 0 }
                  }
                ></AiFillStar>
                <AiFillStar
                  size={16}
                  style={
                    product.ratingAverage >= 3
                      ? { opacity: 1, color: "gold" }
                      : { opacity: 0 }
                  }
                ></AiFillStar>
                <AiFillStar
                  size={16}
                  style={
                    product.ratingAverage >= 4
                      ? { opacity: 1, color: "gold" }
                      : { opacity: 0 }
                  }
                ></AiFillStar>
                <AiFillStar
                  size={16}
                  style={
                    product.ratingAverage >= 5
                      ? { opacity: 1, color: "gold" }
                      : { opacity: 0 }
                  }
                ></AiFillStar>
              </div>
              <button className={styles.home_product_button}>
                Ver producto
              </button>
            </div>
          </div>
          {/*      <img src={logo} alt="image_product" className={styles.homeImg} />
           */}{" "}
        </div>

        <h1
          style={{
            color: "black",
            paddingLeft: "2em",
            paddingTop: "2em",
          }}
        >
          Ofertas
        </h1>
        <div className={styles.horizontalLine}></div>

        <Offers />
      </>
    )
  );
};

export default Home;
