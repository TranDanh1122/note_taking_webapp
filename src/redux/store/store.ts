import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../slice/noteSlide";
export const store = configureStore({
    reducer: {
        note: noteSlice,
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
