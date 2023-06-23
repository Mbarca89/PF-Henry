import { configureStore } from "@reduxjs/toolkit"
import productsSlice from "./slices/productsSlice"
import userSlice from "./slices/userSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        products: productsSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector