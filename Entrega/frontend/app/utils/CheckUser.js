'use client'
import { decode } from "jsonwebtoken"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { setUser, setCartId } from "@/redux/userSlice"

export default function CheckUser() {
    const [cookies] = useCookies(['token'])
    const dispatch = useDispatch()

    const createCart = async (username) => {
        const response2 = await fetch(`http://localhost:8080/api/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        await response2.json()
        getCartId(username)
    }

    const getCartId = async (username) => {
        try {
            const res = await fetch(`http://localhost:8080/api/carts/user/${username}`)
            const data = await res.json()
            console.log(data)
            if (data.status === 'success') {
                dispatch(setCartId(data.payload._id))
                return
            }
            createCart(username)
        } catch (error) {   
            console.log(error)
        }
    }

    useEffect(() => {
        const accessToken = cookies.accessToken
        if (accessToken) {
            const decoded = decode(accessToken)
            dispatch(setUser(decoded.user))
            const username = decoded.user.username.toString()
            getCartId(username)

        }
    }, [cookies])
}