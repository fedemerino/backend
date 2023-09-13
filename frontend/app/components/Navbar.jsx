"use client"
import { useState } from "react"
import { useSelector } from "react-redux"
import { CartIcon, UserIcon, Logo, CloseIcon } from "./Icons"
import checkUser from "../utils/CheckUser"
import Cart from "./Cart"
import Link from "next/link"
import Searchbar from "./Searchbar"
export default function Navbar() {

  const [toggleCart, setToggleCart] = useState(false)
  const handleCart = () => {
    setToggleCart(!toggleCart)
  }
  
  checkUser()

  const user = useSelector((state) => state.user.user)
  const cartId = useSelector((state) => state.user.cartId)
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
            <Link href="/search/all">All</Link>
          </li>
          <li className="text-zinc-400 hover:text-white">
            <Link href="/search/new-arrivals">New Arrivals</Link>
          </li>
          <li className="text-zinc-400 hover:text-white cursor-pointer">
            <Link href="/search/featured">Featured</Link>
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
      {toggleCart ? (
        <div className="flex">
          <div>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
              onClick={handleCart}
            ></div>
          </div>
          <div className={`cart flex flex-col`}>
            <div className="flex justify-end m-3">
              <button className="justify-end" onClick={handleCart}>
                <CloseIcon />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold ml-5">MY ORDER</h3>
            </div>
            {user ? (
              <Cart cartId={cartId} />
            ) : (
              <div className="flex min-w-full flex-col items-center justify-between mt-6 pl-5 pr-5">
                <h3 className="font-medium">Log in to see your cart</h3>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
