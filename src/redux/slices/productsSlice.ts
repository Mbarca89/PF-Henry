import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products, Body } from "../../types";
import { getProducts, getProductsByName, getProductsByFilter } from "../utils/fetchProducts";

type productState = {
  products: Products[];
  productsFiltered: Products[];
  body: Body;
  url: string;
  urlName: string;
  urlPage: string;
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
          "isSorted": false,
          "order": "asc"
        }
      },
      "freeShipping": false,
      "hasDiscount": false,
      "category": "",
      "minPrice": '0',
      "maxPrice": "Infinity"
    },
    url: 'https://pf-henry-back-two.vercel.app/products',
    urlPage: '',
    urlName: ''
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBody: (state, action) => {
      state.body = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
      state.productsFiltered = [...action.payload];
    })
    builder.addCase(getProductsByFilter.fulfilled, (state, action) => {
      state.productsFiltered = [...action.payload];
    })
    builder.addCase(getProductsByName.fulfilled, (state, action) => {
      state.productsFiltered = [...action.payload];
    })
  }
});


// eslint-disable-next-line no-empty-pattern
export const { setBody } = productsSlice.actions;
export default productsSlice.reducer;

