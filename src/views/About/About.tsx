import styles from './About.module.css';
import logo from '../../assets/logook.png'
const About = () => {

  return (
    <div className={styles.about_container}
    style={{
      borderRadius: "10px",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.5)",
    }}
    >
    <img src={logo} alt="" />
    <div className={styles.about_item}>
      <p>
        Somos una empresa dedicada a ofrecer productos naturales de alta calidad que promueven el bienestar y la salud. Nos enorgullece ofrecer una amplia gama de productos elaborados con ingredientes naturales cuidadosamente seleccionados, libres de químicos y aditivos artificiales.
      </p>
    </div>
    <div className={styles.horizontalLine}></div>
    <div className={styles.about_item}>
      <h3>Misión</h3>
      <p>
        Nuestra misión es proporcionar a nuestros clientes productos naturales que mejoren su calidad de vida y promuevan un estilo de vida saludable. Nos esforzamos por ser líderes en la industria de productos naturales, ofreciendo productos de alta calidad y brindando un excelente servicio al cliente.
      </p>
    </div>
    <div className={styles.about_item}>
      <h3>Visión</h3>
      <p>
        Nuestra visión es ser reconocidos como la marca líder en productos naturales, conocida por nuestra calidad, innovación y compromiso con la salud y el bienestar. Nos esforzamos por expandir nuestra oferta de productos, llegar a más personas y ser un referente en el cuidado natural del cuerpo y la mente.
      </p>
    </div>
  </div>
  )
}
export default About;