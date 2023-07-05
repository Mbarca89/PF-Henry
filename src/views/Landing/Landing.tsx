import style from "./Landing.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_white.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container_background}>
      <div className={style.container_landing}>
        <img src={logo} alt="logo" className={style.container_logo} />
        <div className={style.container_description}>
          <h1>Tu belleza natural merece productos naturales.</h1>
          {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut cupiditate quis, culpa possimus sapiente exercitationem, tempore autem nesciunt dolores, sequi explicabo ipsam quisquam totam soluta architecto. Iusto, blanditiis voluptatibus. Vitae.</p> */}
        </div>
        {/* <div className={style.btn}> */}
        <button className={style.btn} onClick={() => navigate("/home")}>
          {" "}
          INGRESAR{" "}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Landing;
