import styles from './Offers.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Offers = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    const offers = [
        {
            name: 'Natural',
            img: 'https://images.ecestaticos.com/4DLDbxAtnp2q7v89O72A2zciduU=/44x0:684x480/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4f1%2F234%2Fa7f%2F4f1234a7f2262ec06f2a26ced0d05e7d.jpg'
        },
        {
            name: 'Natural',
            img: 'https://institutodyn.com/wp-content/uploads/productos-naturales.jpg'
        },
        {
            name: 'Natural',
            img: 'https://www.diariosigloxxi.com/images/showid/5303250'
        },
        {
            name: 'Natural',
            img: 'https://ecolisima.com/wp-content/uploads/2017/11/5-beneficios-de-los-productos-naturales-para-la-salud.jpg'
        }
    ];
    return (
        <div className={styles.offers_container}>
            <Carousel responsive={responsive} infinite={true} className={styles.offers_carousel}>
            {
                offers.map(offer => {
                    return (
                    <div className={styles.offer_container} key={offer.name}>
                        <img src={offer.img} alt={offer.name} />
                        <h3>{offer.name}</h3>
                    </div>
                    )
                })
            }
        </Carousel>
        </div>
    )
}
export default Offers;