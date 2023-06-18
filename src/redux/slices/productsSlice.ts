import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products, Body } from "../../types";
import { fecthProducts, getProducts, getProductsByName, getProductsByFilter } from "../utils/fetchProducts";

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
      "minPrice": '',
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
    builder.addCase(fecthProducts.fulfilled, (state, action) => {
      state.products = [...action.payload.products];
      state.productsFiltered = [...action.payload.products];
    })
  }
});


// eslint-disable-next-line no-empty-pattern
export const { setBody } = productsSlice.actions;
export default productsSlice.reducer;

