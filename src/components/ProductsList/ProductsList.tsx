import styles from './ProductsList.module.css';


const ProductsList = () => {
    const products = [
        {
            name: 'Jugo natural',
            price: 350,
            photos: [
                {
                    url: 'https://img.freepik.com/vector-gratis/anuncio-producto-bebida-energetica-potente-refrescante_52683-34035.jpg?w=2000',
                },
            ],
        },
        {
            name: 'Jugo natural',
            price: 350,
            photos: [
                {
                    url: 'https://img.freepik.com/vector-gratis/anuncio-producto-bebida-energetica-potente-refrescante_52683-34035.jpg?w=2000',
                },
            ],
        },
        {
            name: 'Jugo natural',
            price: 350,
            photos: [
                {
                    url: 'https://img.freepik.com/vector-gratis/anuncio-producto-bebida-energetica-potente-refrescante_52683-34035.jpg?w=2000',
                },
            ],
        },
        {
            name: 'Jugo natural',
            price: 350,
            photos: [
                {
                    url: 'https://img.freepik.com/vector-gratis/anuncio-producto-bebida-energetica-potente-refrescante_52683-34035.jpg?w=2000',
                },
            ],
        },
    ];

    return (
        <div className={styles.productsList_container}>
            {products.map((product) => (
                <div key={product.name} className={styles.productsList_item}>
                    <img src={product.photos[0].url} alt="" />
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <button>Comprar</button>
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
