"use client"
import PropagateLoader from "react-spinners/PropagateLoader"
import Link from "next/link"
import { decode } from "jsonwebtoken"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { setUser, clearUser, clearCartId } from "@/redux/userSlice"
import UserDashboard from "../components/UserDashboard"

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = cookies.accessToken
    if (accessToken) {
      setToken(accessToken)
      const { user } = decode(accessToken)
      dispatch(setUser(user))
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const data = { email, password }
    const response = await fetch("https://sneakers-r0yz.onrender.com/session/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (res.status === 'error') {
      setErrorMsg(res.message)
      return
    }
    localStorage.setItem("token", res.accessToken)
    setCookie("accessToken", res.accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
    })
    setToken(res.accessToken)
    const { user } = decode(res.accessToken)
    dispatch(setUser(user))
    setIsLoading(true)
    window.location.reload()
  }

  const handleLogout = async () => {
    const response = await fetch("https://sneakers-r0yz.onrender.com/session/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    await response
    localStorage.removeItem("token")
    removeCookie("accessToken")
    setToken(null)
    dispatch(clearUser())
    dispatch(clearCartId())
  }

  return (
    <div className="flex justify-center items-center flex-col mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center w-screen mt-12">
          <PropagateLoader color="#36d7b7" />
        </div>
      ) : (
        <>
          {token ? (
            <UserDashboard role={decode(token).user.role} user={decode(token).user.username} handleLogout={handleLogout} />
          ) : (
            <div className="text-center">
              <h1 className="text-2xl text-white font-bold mb-6">Welcome to Sneakers!</h1>
              <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 text-lg text-zinc-500 border rounded-md focus:outline-none focus:border-blue-500"
                    type="text"
                    name="email"
                    id="username"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="w-full px-4 py-2 text-lg text-zinc-500 border rounded-md focus:outline-none focus:border-blue-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
                <button
                  className="mb-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-lg"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>

          )}
        </>
      )}
    </div>
  )
}
