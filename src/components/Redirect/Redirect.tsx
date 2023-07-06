import * as CryptoJS from 'crypto-js';
import { REACT_APP_SECRET } from '../../../config';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/userSlice';

const Redirect = () => {

    const dispatch = useAppDispatch()

    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    let decryptedData = ''

    if (data) {
        const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(data), REACT_APP_SECRET);
        decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    }

    const token = decryptedData
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
    const tokenOk = token?.split("=")[1].split("&")[0];
    if (tokenOk) localStorage.setItem("token", tokenOk);

    const user = decryptedData
        .split("&")
        .find((cookie) => cookie.trim().startsWith("user="));
    if (user) {
        const userJSON = decodeURIComponent(user.split("=")[1]);
        const userOk = JSON.parse(userJSON);
        localStorage.setItem("userData", JSON.stringify(userOk));
        dispatch(setUser(userOk));
    }

    window.location.href = '/products';


    return (
        <></>
    )


}

export default Redirect