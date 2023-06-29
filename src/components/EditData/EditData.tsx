import styles from './EditData.module.css'
import { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'
import { REACT_APP_SERVER_URL } from '../../../config'
import { useNavigate } from 'react-router-dom'
//import { CgProfile } from 'react-icons/cg'

const EditData = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        id: '',
        name: '',
        email: '',
        active: null,
        cart: '',
        commerceName: '',
        role: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        password:''
    })
    const [password, setPassword] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirm: '',
        userId: ''
    })
    const [error, setError] = useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        localStorage.setItem("userData", JSON.stringify(user));
    }
    const handlePassword = async (event: ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmitPassword = async () => {
        try {
            if(password.newPassword !== password.newPasswordConfirm){
                setError('La contraseña no coincide')
            }
            else{
                const {data} = await axios.put(`${REACT_APP_SERVER_URL}/users/changepassword`, password)
                console.log(data);
                if(data === 'Contraseña actualizada con éxito!'){
                    localStorage.removeItem("userData");
                    localStorage.removeItem("token");
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const {data} = await axios.put(`${REACT_APP_SERVER_URL}/users/updateuser`, user)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }
    useEffect(()=> {
        const stringUser = localStorage.getItem('userData')
        if(stringUser){
            const JSONUser = JSON.parse(stringUser)
            setUser(JSONUser)
            setPassword({
                ...password,
                userId: JSONUser.id
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className={styles.accountInfo}>
      <h3>Editar datos de la cuenta:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" value={user.name} onChange={handleChange} name='name'/>
        </div>
        <div>
          <label htmlFor="address">Dirección:</label>
          <input type="text" id="address" value={user.address} onChange={handleChange} name='address'/>
        </div>
        <div>
          <label htmlFor="city">Ciudad:</label>
          <input type="text" id="city" value={user.city} onChange={handleChange} name='city'/>
        </div>
        <div>
          <label htmlFor="province">Provincia:</label>
          <input type="text" id="province" value={user.province} onChange={handleChange} name='province'/>
        </div>
        <div>
          <label htmlFor="postalCode">Codigo Postal:</label>
          <input type="number" id="postalCode" value={user.postalCode} onChange={handleChange} name='postalCode'/>
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input type="text" id="city" value={user.phone} onChange={handleChange} name='phone'/>
        </div>
        <button>EDITAR</button>
      </form>
        <h3>Cambiar contraseña</h3>
        <div>
          <label htmlFor="password">Contraseña antigua:</label>
          <input type="password" id="password" value={password.password} onChange={handlePassword} name='password'/>
          <label htmlFor="newPassword">Contraseña nueva:</label>
          <input type="password" id="newPassword" value={password.newPassword} onChange={handlePassword} name='newPassword'/>
          <label htmlFor="newPasswordConfirm">Confirmar contraseña:</label>
          <input type="password" id="newPasswordConfirm" value={password.newPasswordConfirm} onChange={handlePassword} name='newPasswordConfirm'/>
          {error && <p>{error}</p>}
          <button onClick={handleSubmitPassword}>ACTUALIZAR CONTRASEÑA</button>
        </div>
    </div>
    )
}

export default EditData