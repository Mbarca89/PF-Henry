import { createSlice } from "@reduxjs/toolkit";
import { Products, Body } from "../../types";
import { fecthProducts} from "../utils/fetchProducts";
import {REACT_APP_SERVER_URL} from '../../../config.ts'

type productState = {
  products: Products[];
  productsFiltered: Products[];
  body: Body;
  url: string;
  urlName: string;
  urlPage: string;
  productCount: number;
  JWT: string
};
const initialState: productState = {
  products: [],
  productsFiltered: [],
  body: 
    {
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
          "isSorted": true,
          "order": "desc"
        }
      },
      "freeShipping": false,
      "hasDiscount": false,
      "category": "",
      "minPrice": '',
      "maxPrice": Infinity
    },
    url: `${REACT_APP_SERVER_URL}/products`,
    urlPage: '1',
    urlName: '',
    productCount: 0,
    JWT: '',
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBody: (state, action) => {
      state.body = action.payload
    },
    setName: (state, action) => {
      state.urlName = action.payload
    },
    setPage: (state, action) => {
      state.urlPage = action.payload
    },
    setJWT: (state, action) => {
      state.JWT = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fecthProducts.fulfilled, (state, action) => {
      if(!action.payload){
        state.products = []
        state.productsFiltered = [];
        state.productCount = 0
      } else {
        state.products = [...action.payload.products];
        state.productsFiltered = [...action.payload.products];
        state.productCount = action.payload.totalCount
      }
    })
  }
});


// eslint-disable-next-line no-empty-pattern
export const { setBody, setName, setPage, setJWT } = productsSlice.actions;
export default productsSlice.reducer;

