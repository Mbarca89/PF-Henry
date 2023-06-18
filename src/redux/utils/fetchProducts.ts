import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_PRODUCTS = 'https://pf-henry-back-two.vercel.app/products?page=1';
const BODY = {
  "sort": {
    "price": {
      "isSorted": false,
      "order": "asc"
    },
    "sales": {
      "isSorted": false,
      "order": "asc"
    },
    "relevant": {
      "isSorted": false,
      "order": "asc"
    }
  },
  "freeShipping": false,
  "hasDiscount": false,
  "category": "",
  "minPrice": 0,
  "maxPrice": "Infinity"
}

export const getProducts = createAsyncThunk(
    'products/get',
    async (thunkApi) => {
      const response = await axios.post(
        API_PRODUCTS,
        BODY
      );

      console.log(response);
      
      return response.data.products;
    }
);


export const getProductsByFilter = createAsyncThunk(
  'products/getByFilter',
  async (
    {
      price,
      sales,
      relevant,
      freeShipping,
      hasDiscount,
      category,
      minPrice,
      maxPrice
    }: {
      price: { isSorted: boolean; order: string };
      sales: { isSorted: boolean; order: string };
      relevant: { isSorted: boolean; order: string };
      freeShipping: boolean;
      hasDiscount: boolean;
      category: string;
      minPrice: string;
      maxPrice: string;
    }
  ) => {
    const BODY = {
      sort: {
        price: {
          isSorted: price.isSorted,
          order: price.order
        },
        sales: {
          isSorted: sales.isSorted,
          order: sales.order
        },
        relevant: {
          isSorted: relevant.isSorted,
          order: relevant.order
        }
      },
      freeShipping: freeShipping,
      hasDiscount: hasDiscount,
      category: category,
      minPrice: minPrice,
      maxPrice: maxPrice
    };

    const response = await axios.post(API_PRODUCTS, BODY);
    console.log(response);

    return response.data.products;
  }
);
export const getProductsByName = createAsyncThunk(
  'products/getByName',
  async (input: string) => {
    const response = await axios.post(
      `${API_PRODUCTS}&name=${input}`,
      BODY
    );

    console.log(response);
    
    return response.data.products;
  }
);