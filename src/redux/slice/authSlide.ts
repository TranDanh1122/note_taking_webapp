import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initData: UserData = {
    user: null,
    token: localStorage.getItem("access_token") ?? null
}
const authSlicer = createSlice({
    name: "auth",
    initialState: initData,
    reducers: {
        setUser: (state: UserData, action: PayloadAction<unknown>) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))

        },
        setToken: (state: UserData, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem('access_token', action.payload)
        },
        logout: (state: UserData) => {
            state.user = null
            state.token = null
            localStorage.removeItem("access_token")
        }
    }
})
export const { setUser, setToken, logout } = authSlicer.actions;
export default authSlicer.reducer