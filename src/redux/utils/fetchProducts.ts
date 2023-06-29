import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {notifyError} from "../../components/Toaster/Toaster.js";
import {REACT_APP_SERVER_URL} from '../../../config.ts'

//const { body } = useAppSelector((state: RootState) => state.products);
export const fecthProducts = createAsyncThunk(
  'products/get',
  async ({ page, name, body }: { page: string; name: string; body: any }) => {
    try {
      const {data} = await axios.post(
        `${API_PRODUCTS}?page=${page}&name=${name}`,
        body
      );
      return data;      
    } catch (error:any) {
      notifyError(error.response.data)
    }
  }
);
const API_PRODUCTS = `${REACT_APP_SERVER_URL}/products`;

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
    try {
      const response = await axios.post(API_PRODUCTS, BODY);
      return response.data.products;
    } catch (error:any) {
      notifyError(error.response.data)
    }

  }
);

