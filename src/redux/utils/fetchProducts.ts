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
  'products/get',
  async (
    {
      priceSorted,
      salesSorted,
      relevantSorted,
      freeShipping,
      hasDiscount,
      category,
      minPrice,
      maxPrice
    }: {
      priceSorted: { isSorted: boolean; value: string };
      salesSorted: { isSorted: boolean; value: string };
      relevantSorted: { isSorted: boolean; value: string };
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
          isSorted: priceSorted.isSorted,
          order: priceSorted.value
        },
        sales: {
          isSorted: salesSorted.isSorted,
          order: salesSorted.value
        },
        relevant: {
          isSorted: relevantSorted.isSorted,
          order: relevantSorted.value
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
