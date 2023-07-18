'use client'
import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'

export default function ProductPage({ params }) {
    const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']
    const { id } = params
    const [product, setProduct] = useState()
    const [initialImg, setInitialImg] = useState()
    const [selectedSize, setSelectedSize] = useState()

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8080/api/products/${id}`)
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
    return product ? <div className='flex justify-center items-center productSingleCardContainer'>
        <div className='flex'>
            <div className='imgColumn'>
                <div className='initialImgContainer flex justify-center items-center'>
                    <img src={initialImg} alt="" className='productSingleCardImg' />
                </div>
                <div className='flex gap-2'>
                    {product.thumbnail.map((img, index) =>
                        <div className='productImgSelectorContainer cursor-pointer flex justify-center items-center' onClick={() => handleImage(index)}>
                            <img src={img} alt="" className='productImgSelector' key={index} />
                        </div>
                    )}
                </div>
            </div>
            <div className='infoColumn'>
                <div className='flex  items-center'>
                    <p>{product.title}</p>
                </div>
                <div className='flex  items-center'>
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
                <button className='addToCartBtn mt-5'>
                    Add to Cart
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