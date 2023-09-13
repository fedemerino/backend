'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader"
import All from './all/All'

export default function page() {
  const searchParams = useSearchParams()
  const queryValue = searchParams.get('product').toLowerCase()
  const [response, setResponse] = useState()
  const getProducts = async () => {
    const response = await fetch('https://sneakers-r0yz.onrender.com/api/products')
    const data = await response.json()
    const products = data.payload.filter((product) => product.title.toLowerCase().includes(queryValue))
    setResponse(products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return response ? <All response={response} /> :
    <div className='flex justify-center items-center w-screen mt-12'>
      <PropagateLoader
        color='#36d7b7'
      />
    </div>
}