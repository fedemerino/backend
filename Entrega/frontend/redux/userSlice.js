import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        setCartId: (state, action) => {
            state.user.cartId = action.payload
        },
        clearCartId(state) {
            state.user.cart = null
        },
    }
})

export const { setUser, clearUser, setCartId, clearCartId } = userSlice.actions
export default userSlice.reducer