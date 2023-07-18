'use client'
import { useState } from 'react'
import { CartIcon, UserIcon, Logo } from "./Icons"
import Link from "next/link"
import Searchbar from './Searchbar'
export default function Navbar() {
    const [toggleCart, setToggleCart] = useState(false)
    const handleCart = () => {
        setToggleCart(!toggleCart)
    }
    return (
        <nav className="flex justify-between mt-3 mx-20 items-center mb-3">
            <div>
                <ul className="flex justify-between gap-5 items-center">
                    <li>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </li>
                    <li className="text-zinc-400 hover:text-white">
                        <Link href="/search/all">
                            All
                        </Link>
                    </li>
                    <li className="text-zinc-400 hover:text-white">
                        <Link href="/search/new-arrivals">
                            New Arrivals
                        </Link>
                    </li>
                    <li className="text-zinc-400 hover:text-white cursor-pointer">
                        <Link href="/search/featured">
                            Featured
                        </Link>
                    </li>
                </ul>
            </div>
            <Searchbar />
            <div className="flex gap-6 justify-center items-center">
                <span className="cursor-pointer" onClick={handleCart}>
                    <CartIcon />
                </span>
                <span className="cursor-pointer">
                    <Link href="/login">
                        <UserIcon />
                    </Link>
                </span>
            </div>
            {
                toggleCart ?
                    <div className='cart'>
                        <button onClick={handleCart}>Cerrar</button>
                        <p>this is the cart</p>
                    </div>
                    : null
            }

        </nav>
    )
}