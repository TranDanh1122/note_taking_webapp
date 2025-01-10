import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../slice/noteSlide";
export const store = configureStore({
    reducer: {
        note: noteSlice
    }
})
 