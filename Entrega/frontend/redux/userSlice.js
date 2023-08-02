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
        setCart: (state, action) => {
            state.user.cart = action.payload
        },
        clearCart(state) {
            state.user.cart = null
        }
    }
})

export const { setUser, clearUser, setCart, clearCart } = userSlice.actions
export default userSlice.reducer