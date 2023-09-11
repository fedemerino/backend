import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        cartId: ''
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
            state.cartId = action.payload
        },
        clearCartId(state) {
            state.cartId = ''
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
