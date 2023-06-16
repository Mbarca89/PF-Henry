import { configureStore } from "@reduxjs/toolkit"
import productsSlice from "./slices/productsSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        products: productsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector