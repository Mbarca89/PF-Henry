import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//const { body } = useAppSelector((state: RootState) => state.products);
export const fecthProducts = createAsyncThunk(
  'products/get',
  async ({ page, name, body }: { page: string; name: string; body: any }, thunkApi) => {
    try {
      const response = await axios.post(
        `${API_PRODUCTS}?page=${page}&name=${name}`,
        body
      );
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
);
const API_PRODUCTS = 'https://pf-henry-back-two.vercel.app/products';

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

    return response.data.products;
  }
);

