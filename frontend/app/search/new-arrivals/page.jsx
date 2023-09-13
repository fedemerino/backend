'use client'
import { useState, useEffect } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader"
import All from '../all/All'

export default function Page() {

  const [response, setResponse] = useState()

  const getProducts = async () => {
    const response = await fetch('https://sneakers-r0yz.onrender.com/api/products')
    const data = await response.json()
    setResponse(data.payload.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)))
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