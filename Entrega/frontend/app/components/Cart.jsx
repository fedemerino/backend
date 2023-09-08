'use client'
import { useState, useEffect } from 'react'
import { DeleteIcon } from './Icons'
import { useSelector } from 'react-redux'
export default function Cart({cartId}) {
    const [cart, setCart] = useState([])
    
    useEffect(() => {
       cartId && getCart()
    }, [cartId])

    const getCart = async () => {
        if (!cartId) return
        const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
        const data = await response.json()
        setCart(data.products)
    }
    
    const handleDelete = async (pid) => {
        await fetch(`http://localhost:8080/api/carts/${cartId}/product/${pid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await getCart()
    }
    const subtotal = cart.reduce((accumulator, item) => {
        const itemTotal = item.product.price * item.quantity;
        return accumulator + itemTotal;
    }, 0);
    const shipping = 0;
    const total = subtotal + shipping;
    return (
        <>
            <div className='cartProductsContainer'>
                {cart.length > 0 ?
                    cart.map((item) => {
                        return (
                            <div key={item.product.title} className='flex justify-center mt-6 ml-5 mr-5'>
                                <div className='flex justify-evenly min-w-full'>
                                    <div className='cartImgContainer flex justify-center items-center'>
                                        <img src={item.product.thumbnail[0]} className='cartImg' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='font-semibold text-sm' style={{ maxWidth: '90%' }}>{item.product.title}</p>
                                        <p className='text-sm'>{item.product.description}</p>
                                        <div className='flex items-center font-semibold'>
                                            <p className='text-sm'>Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className='cursor-pointer flex flex-col justify-center items-center gap-4' onClick={() => handleDelete(item.product._id)}>
                                            <DeleteIcon style={'deleteIcon'} />
                                            <p className='font-semibold text-sm'>$ {item.product.price * item.quantity}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className='flex min-w-full flex-col items-center justify-between mt-6 pl-5 pr-5'>
                        <p className='font-medium'>
                            Looks like your cart is empty.
                        </p>
                        <p className='font-medium'>
                            Explore our products and add them here!
                        </p>
                    </div>
                }
            </div>
            <div className='cartDataContainer pt-5'>
                <div className='mr-5 ml-5 flex flex-col'>
                    <span className='flex justify-between'>
                        <p className='text-sm'>Subtotal</p>
                        <p className='text-sm'>$ {subtotal}</p>
                    </span>
                    <span className='flex justify-between'>
                        <p className='text-sm'>Shipping</p>
                        <p className='text-sm'>$ {shipping}</p>
                    </span>
                    <span className='divider'></span>
                    <span className='flex justify-between'>
                        <p className='font-semibold text-base'>Total</p>
                        <p className='font-semibold text-base'>${total}</p>
                    </span>
                    <div className='flex justify-center mt-10'>
                        <button className='cartButton'>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}