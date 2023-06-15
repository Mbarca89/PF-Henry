import axios from "axios"

const API_PRODUCTS = 'https://pf-henry-back-two.vercel.app/products?page=1';
const BODY = {"price":{"isSorted": true, "order":"asc"},"relevant":{"isSorted": true, "order":"desc"}}
export const fetchProducts = async () => {
    try{
        const response = await axios.post(API_PRODUCTS, BODY);
        console.log(response.data);
        
    } catch (err) {
        console.log(err);
    }

}