'use client'
import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
export default function ProductPage({ params }) {
    const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']
    const { id } = params
    const [product, setProduct] = useState()
    const [initialImg, setInitialImg] = useState()
    const [selectedSize, setSelectedSize] = useState()
    const [quantity, setQuantity] = useState(1)
    const cart = useSelector(state => state.user.cartId)

    const getProducts = async () => {
        const response = await fetch(`https://sneakers-r0yz.onrender.com/api/products/${id}`)
        const data = await response.json()
        setProduct(data.payload)
        setInitialImg(data.payload.thumbnail[0])
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleImage = (index) => {
        setInitialImg(product.thumbnail[index])
    }
    const handleSize = (size) => {
        if (size !== selectedSize) {
            setSelectedSize(size)
        }
    }

    const addProduct = async () => {
        try {
            await fetch(`https://sneakers-r0yz.onrender.com/api/carts/${cart}/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: quantity
                })
            })
        } catch (error) {
            toast.error('Error adding product to cart')
        }
    }

    const handleAddToCart = () => {
        if (selectedSize) {
            addProduct()
            toast.success('Product added to cart')
            return
        }
        toast.error('Please select a size first')
    }

    const handleAdd = () => {
        if (quantity >= 10) return
        setQuantity(quantity + 1)
    }

    const handleSubtract = () => {
        if (quantity <= 1) return
        setQuantity(quantity - 1)
    }
    return product ? <div className='flex justify-center items-center productSingleCardContainer'>
        <div className='flex'>
            <div className='imgColumn'>
                <div className='initialImgContainer flex justify-center items-center'>
                    <img src={initialImg} alt="" className='productSingleCardImg' />
                </div>
                <div className='flex gap-2'>
                    {product.thumbnail.map((img, index) =>
                        <div key={'image' + index} className='productImgSelectorContainer cursor-pointer flex justify-center items-center' onClick={() => handleImage(index)}>
                            <img src={img} alt="" className='productImgSelector' />
                        </div>
                    )}
                </div>
            </div>
            <div className='infoColumn'>
                <div className='flex items-center'>
                    <p>{product.title}</p>
                </div>
                <div className='flex items-center'>
                    <p>$ {product.price}</p>
                </div>
                <div className='flex  items-center justify-end'>
                    <p>Select Size (US)</p>
                </div>
                <div className='flex gap-1 sizeSelectorContainer'>
                    {sizes.map(size =>
                        <button className={`sizeSelector flex justify-center items-center cursor-pointer ${selectedSize === size ? 'selected' : ''}`} key={size} onClick={() => handleSize(size)}>
                            <p>{size}</p>
                        </button>
                    )}
                </div>
                <div className='flex justify-center'>
                    <div className='flex quantityButtons justify-center items-center font-semibold'>
                        <button className={` ${quantity <= 1 ? 'cursor-not-allowed' : ''} quantityButton rounded-tl-2xl rounded-bl-2xl`} onClick={() => handleSubtract(quantity)}>-</button>
                        <p className='quantity'>{quantity}</p>
                        <button disabled={product.stock <= quantity} className={`${product.stock <= quantity ? 'cursor-not-allowed' : ''} quantityButton rounded-tr-2xl rounded-br-2xl`} onClick={() => handleAdd(quantity)}>+</button>
                    </div>
                </div>
                <button disabled={product.stock <= 0} className={`${product.stock <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'} addToCartBtn mt-5`} onClick={handleAddToCart}>
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    </div>
        : <div className='flex justify-center items-center w-screen mt-12'>
            <PropagateLoader
                color='#36d7b7'
            />
        </div>
}