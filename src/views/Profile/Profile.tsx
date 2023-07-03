import styles from "./Profile.module.css";
import { CgProfile, CgShoppingBag, CgDatabase } from "react-icons/cg";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyPurchases from "../../components/MyPurchases/MyPurchases";
import EditData from "../../components/EditData/EditData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userData");
    if (storedUserName) {
      const storedUserNameOk = JSON.parse(storedUserName);
      setUserName(storedUserNameOk);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!userName) navigate("/login");
    }
  }, [loading]);

  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("myProfile");

  const sectionHandler = (event: any) => {
    setCurrentSection(event.target.id);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.nav}>
        <div className={styles.nav_option}>
          <div onClick={sectionHandler} id="myProfile"></div>
          <CgProfile size={25}></CgProfile>
          <p>Mi perfil</p>
        </div>
        <div className={styles.nav_option}>
          <div onClick={sectionHandler} id="myPurchases"></div>
          <CgShoppingBag size={25}></CgShoppingBag>
          <p>Mis compras</p>
        </div>
        <div className={styles.nav_option}>
          <div onClick={sectionHandler} id="editData"></div>
          <CgDatabase size={25}></CgDatabase>
          <p>Editar mis datos</p>
        </div>
      </div>
      <div className={styles.body}>
        {currentSection === "myProfile" && <MyProfile />}
        {currentSection === "myPurchases" && <MyPurchases />}
        {currentSection === "editData" && <EditData />}
      </div>
    </div>
  );
};

export default Profile;
