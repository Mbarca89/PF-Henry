import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

type userState = {
  user: User;
};
const initialState: userState = {
  user: {
    id: '',
    name: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: '',
    commerceName: '',
    role: '',
    cart: '',
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
});


// eslint-disable-next-line no-empty-pattern
export const { setUser } = userSlice.actions;
export default userSlice.reducer;