'use client'
import { decode } from "jsonwebtoken"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setCartId, setLoggedInStatus } from "@/redux/userSlice"

export default function CheckUser() {

    const [cookies] = useCookies(['token'])
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    const createCart = async (username) => {
        const response2 = await fetch(`http://localhost:8080/api/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        const data = await response2.json()
        await getCartId(username)
    }

    const getCartId = async (username) => {
        try {
            const res = await fetch(`http://localhost:8080/api/carts/user/${username}`)
            const data = await res.json()
            if (data.status === 'success') {
                dispatch(setCartId(data.payload._id))
            } else {
                await createCart(username)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const accessToken = cookies.accessToken
        if (accessToken) {
            const decoded = decode(accessToken)
            if (!isLoggedIn) {
                dispatch(setUser(decoded.user))
                dispatch(setLoggedInStatus( true))
                console.log('!isloggedin')
            }
            console.log('isloggedin')
            const username = decoded.user.username.toString()
            console.log(username)
            const fetchCartData = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/api/carts/user/${username}`)
                    const data = await res.json()
                    console.log(data)
                    if (data.status == 'success') {
                        dispatch(setCartId(data.payload._id))
                    } else {
                        await createCart(username)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchCartData()
        }
    }, [cookies, isLoggedIn])
}