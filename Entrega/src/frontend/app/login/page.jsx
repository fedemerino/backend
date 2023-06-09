'use client'
import PropagateLoader from 'react-spinners/PropagateLoader'
import Link from "next/link";
import { decode } from "jsonwebtoken";
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation';
export default function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [token, setToken] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const accessToken = cookies.accessToken
        if (accessToken) {
            const decoded = decode(accessToken)
            setToken(decoded.user)
            setIsLoggedIn(true)
        }
        setIsLoading(false)
    }, [])


    const handleSubmit = async () => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const data = { email, password }
        const response = await fetch('http://localhost:8080/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const json = await response.json()
        localStorage.setItem('token', json.accessToken)
        setCookie('accessToken', json.accessToken, { path: '/', maxAge: 60 * 60 * 24 })
        setToken(json.accessToken)
        setIsLoggedIn(true)
        setIsLoading(true)
        router.push('/')
    }

    const handleLogout = async () => {
        const response = await fetch('http://localhost:8080/session/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response
        console.log(json)
        localStorage.removeItem('token')
        removeCookie('accessToken')
        setToken(null)
        setIsLoggedIn(false)
    }


    return (
        <div className="flex justify-center items-center flex-col mt-10">
            {isLoading ?
                <div className='flex justify-center items-center w-screen mt-12'>
                    <PropagateLoader
                        color='#36d7b7'
                    />
                </div> :
                <>
                    {isLoggedIn ?
                        <>
                            <h1 className="text-xl text-white mb-3">Welcome to Sneakers {token.username} !</h1>
                            <button onClick={handleLogout} className="text-md defaultButton formInput">Logout</button>
                        </>
                        : <>
                            <h1 className="text-xl text-white mb-3">Welcome to Sneakers!</h1>
                            <form className="flex  flex-col justify-center align-center gap-3" onSubmit={handleSubmit}>
                                <input className="text-md text-zinc-500 border border-zinc-500 formInput" type="text" name="email" id="username" placeholder="email" required />
                                <input className="text-md text-zinc-500 border border-zinc-500 formInput" type="password" name="password" id="password" placeholder="Password" required />
                                <input className="text-md text-zinc-500 border border-zinc-500 formInput" type="submit" value="Login" />
                                <Link href="/forgotPassword">
                                    <p>Forgot password?</p>
                                </Link>
                            </form>
                        </>}
                </>}
        </div>
    )
}