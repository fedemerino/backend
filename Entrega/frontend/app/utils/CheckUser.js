"use client"
import { useCookies } from "react-cookie"
import { decode } from "jsonwebtoken"
import { useDispatch } from "react-redux"
import { setUser, setCartId } from "@/redux/userSlice"
import { useEffect } from "react"

export default function checkUser() {
  const [cookies] = useCookies(["token"])
  const dispatch = useDispatch()

  const getCartId = async (username) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/carts/user/${username}`
      )
      const data = await res.json()
      if (data.status === "success") {
        dispatch(setCartId(data.payload._id))
      } else {
        await createCart(username)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createCart = async (username) => {
    const response = await fetch(`http://localhost:8080/api/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
    const data = await response.json()
    console.log(data)
    await getCartId(username)
  }

  useEffect(() => {
    if (cookies.accessToken && cookies.accessToken !== "undefined") {
      const { user } = decode(cookies.accessToken)
      const { username } = user
      dispatch(setUser(user))
      getCartId(username)
    }
  }, [])
}
