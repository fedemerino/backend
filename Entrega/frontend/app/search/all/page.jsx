'use client'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useState, useEffect } from 'react'
import All from './All'

export default function Page() {
    const [response, setResponse] = useState()

    const getProducts = async () => {
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()
        setResponse(data.payload)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return response ? 
    <All response={response} />
    :
    <div className='flex justify-center items-center w-screen mt-12'>
        <PropagateLoader
        color='#36d7b7'
        />
    </div>
}