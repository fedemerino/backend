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
        },
        clearUser: (state) => {
            state.user = null
        },
        setCartId: (state, action) => {
            state.cartId = action.payload
        },
        clearCartId(state) {
            state.cartId = ''
        },
    },
})

export const {
    setUser,
    clearUser,
    setCartId,
    clearCartId,
    
} = userSlice.actions

export default userSlice.reducer
