import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,  
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        clearUser: (state) => {
            state.user = null
            state.isLoggedIn = false 
        },
        setCartId: (state, action) => {
            state.user.cartId = action.payload
        },
        clearCartId(state) {
            state.user.cartId = null
        },
        setLoggedInStatus(state, action) {
            state.isLoggedIn = action.payload
        },
    },
})

export const {
    setUser,
    clearUser,
    setCartId,
    clearCartId,
    setLoggedInStatus,
} = userSlice.actions

export default userSlice.reducer
