import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../../types";
import { getProducts } from "../utils/fetchProducts";

type productState = {
  products: Products[];
};

const initialState: productState = {
  products: [
    {
      name: "Cargando",
      price: 0,
      description: "",
      stock: 0,
      hasDiscount: true,
      discount: 0,
      photos: [
        {
          url: "https://cdn-icons-png.flaticon.com/512/107/107814.png?w=360",
          public_id: "",
        },
      ],
      freeShipping: true,
      sales: 0,
      rating: 0,
      id: "",
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.products = [...action.payload];
    });
  }
});


// eslint-disable-next-line no-empty-pattern
export const {} = productsSlice.actions;
export default productsSlice.reducer;

