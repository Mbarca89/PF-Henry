import styles from "./Offers.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REACT_APP_SERVER_URL } from "../../../config.ts";

const Offers = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const navigate = useNavigate();

  const [offers, setOffers] = useState([
    {
      photos: [
        {
          url: "",
        },
      ],
      name: "",
      price: 0,
      discount: 0,
      _id: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOffers = async () => {
      const { data } = await axios.get(
        `${REACT_APP_SERVER_URL}/products/offers`
      );
      setOffers(data);
      setLoading(false);
    };
    getOffers();
  }, []);

  return (
    !loading && (
      <div className={styles.offers_container}>
        <Carousel
          responsive={responsive}
          infinite={true}
          className={styles.offers_carousel}
        >
          {offers.map((offer, index) => {
            return (
              <div className={styles.offer_container} key={index}>
                <img
                  onClick={() => navigate(`/products/${offer._id}`)}
                  src={offer.photos[0]?.url}
                  alt={offer.name}
                  style={{
                    borderRadius: "4px",
                  }}
                />
                <h3>{offer.name}</h3>
                <div className={styles.price}>
                  <h5
                    className={styles.price_descuento}
                  >{`$${offer.price}`}</h5>
                  <h4 className={styles.price_real}>
                    {" "}
                    {`$${(offer.price * (100 - offer.discount)) / 100}`}{" "}
                  </h4>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    )
  );
};
export default Offers;
