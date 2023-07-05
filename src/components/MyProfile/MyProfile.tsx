import styles from './MyProfile.module.css'
import { CgProfile } from 'react-icons/cg'
import { useState, useEffect } from 'react'

const MyProfile = () => {

    const [user,setUser] = useState({
        name: '',
        email:'',
        address:'',
        city:'',
        province:'',
        role: ''
    })

    useEffect(()=> {
        const stringUser = localStorage.getItem('userData')
        if(stringUser){
            setUser(JSON.parse(stringUser))
        }
    },[])

    return (
        user && <div className={styles.myProfile}>
            <div className={styles.mainInfo}>
                <div>
                    <CgProfile size={50} />
                </div>
                <div className={styles.userInfo}>
                    <h2>{user.name}</h2>
                    <h5>{user.email}</h5>
                </div>
            </div>
            <div className={styles.accountInfo}>
                <h3>Datos de la cuenta:</h3>
                <div>
                    <h4>Nombre:</h4>
                    <h5>{user.name}</h5>
                </div>
                <div>
                    <h4>Email:</h4>
                    <h5>{user.email}</h5>
                </div><div>
                    <h4>Direccion:</h4>
                    <h5>{user.address}</h5>
                </div><div>
                    <h4>Ciudad:</h4>
                    <h5>{user.city}</h5>
                </div><div>
                    <h4>Provincia:</h4>
                    <h5>{user.province}</h5>
                </div>
            </div>
            <div className={styles.seller}>
                {user.role !== 'seller' ? <div className={styles.text}>
                    <h3>¿Queres ser vendedor?</h3>
                    <p>Unite a nuestra gran familia y ofrecé tus productos a una comunidad en pleno crecimiento.</p>
                    <a href='https://pf-henry-dash.vercel.app/' target='_blank'>Registrarme</a>
                </div>
                :
                <div className={styles.text}>
                    <h3>Ingreso al dashboard</h3>
                    <p>Gestiona tus productos y visualiza tu crecimiento junto a nosotros.</p>
                    <a href='https://pf-henry-dash.vercel.app/' target='_blank'>Ingresar</a>
                </div>}
            </div>
        </div>
    )
}

export default MyProfile