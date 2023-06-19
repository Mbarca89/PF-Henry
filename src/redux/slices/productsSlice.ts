import { createSlice } from "@reduxjs/toolkit";
import { Products, Body } from "../../types";
import { fecthProducts} from "../utils/fetchProducts";

type productState = {
  products: Products[];
  productsFiltered: Products[];
  body: Body;
  url: string;
  urlName: string;
  urlPage: string;
  productCount: number;
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
    url: 'http://localhost:3000/products',
    urlPage: '1',
    urlName: '',
    productCount: 0
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fecthProducts.fulfilled, (state, action) => {
      state.products = [...action.payload.products];
      state.productsFiltered = [...action.payload.products];
      state.productCount = action.payload.totalCount
    })
  }
});


// eslint-disable-next-line no-empty-pattern
export const { setBody, setName, setPage } = productsSlice.actions;
export default productsSlice.reducer;

