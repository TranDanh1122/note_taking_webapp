import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../slice/noteSlide";
import authSlice from "../slice/authSlide"
export const store = configureStore({
    reducer: {
        note: noteSlice,
        auth: authSlice
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
