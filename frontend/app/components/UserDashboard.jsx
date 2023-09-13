'use client'
import { useEffect, useState } from "react"
import UserRow from "./UserRow"
import ProductRow from "./ProductRow"
import ConfirmModal from "./ConfirmModal"
import { toast } from 'react-toastify'
import { setUser } from "@/redux/userSlice"
export default function AdminDashboard({ role, user, handleLogout }) {
    const [activeTab, setActiveTab] = useState('Products')
    const [usersData, setUsersData] = useState([])
    const [productsData, setProductsData] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleFilterUsers = (user) =>{
        setUsersData(usersData.filter((u) => u.email !== user.email))
    }

    const handleFilterProducts = (product) =>{
        setProductsData(productsData.filter((p) => p.code !== product.code))
    }

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const getUsers = async () => {
        if (role !== 'admin') return
        const response = await fetch('https://sneakers-r0yz.onrender.com/api/users/all')
        const data = await response.json()
        setUsersData(data)
    }
    const getProducts = async () => {
        if (role === 'admin') {
            const response = await fetch('https://sneakers-r0yz.onrender.com/api/products?limit=1000000')
            const data = await response.json()
            setProductsData(data.payload)
        }
        if (role === 'premium') {
            const response = await fetch(`https://sneakers-r0yz.onrender.com/api/products?limit=1000000&user=${user}`)
            const data = await response.json()
            setProductsData(data.payload)
        }
    }
    useEffect(() => {
        getUsers()
        getProducts()
    }, [])

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    const handleDeleteInactiveUsers = async () => {
        const response = await fetch(`https://sneakers-r0yz.onrender.com/api/users/inactive`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const res = await response.json()
        if (res.status === 'success') {
            toast.success('Inactive users deleted successfully')
            handleOpenModal()
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }
        else {
            toast.error('Something went wrong')
        }
    }

    if (role === 'user') return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center items-center mb-6">
                    <h1 className="text-2xl font-semibold">
                        Welcome to Sneakers {user} !  
                    </h1>
                </div>
                <div className="text-center">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-lg mt-4"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>

    )
    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">
                        {role === 'admin' ? 'Admin' : 'Premium'} Dashboard - {role === 'premium' ? 'My' : null} {activeTab}
                    </h1>
                    {role === 'admin' ?
                        <div className="space-x-4">
                            <button
                                onClick={() => handleTabChange('Users')}
                                className={`${activeTab === 'Users' ? 'bg-blue-500' : 'bg-gray-600'
                                    } hover:bg-blue-600 text-white py-2 px-4 rounded-md text-lg`}
                            >
                                Users
                            </button>
                            <button
                                onClick={() => handleTabChange('Products')}
                                className={`${activeTab === 'Products' ? 'bg-green-500' : 'bg-gray-600'
                                    } hover:bg-green-600 text-white py-2 px-4 rounded-md text-lg`}
                            >
                                Products
                            </button>
                            <button
                                onClick={handleOpenModal}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-lg">
                                Delete Inactive Users
                            </button>
                        </div>
                        : null}

                </div>
                {activeTab === 'Users' ? (
                    <div className="max-h-[80vh] overflow-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <th className="py-2 px-4 text-left">First Name</th>
                                    <th className="py-2 px-4 text-left">Last Name</th>
                                    <th className="py-2 px-4 text-left">Username</th>
                                    <th className="py-2 px-4 text-left">Email</th>
                                    <th className="py-2 px-4 text-left">Role</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.map((user) => (
                                    <tr key={user.id}>
                                        <UserRow user={user} handleFilterUsers={handleFilterUsers} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="max-h-[80vh] overflow-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-600 text-white">
                                    <th className="py-2 px-4 text-left">Code</th>
                                    <th className="py-2 px-4 text-left">Title</th>
                                    <th className="py-2 px-4 text-left">Price</th>
                                    <th className="py-2 px-4 text-left">Stock</th>
                                    <th className="py-2 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map((product) => (
                                    <tr key={product.id}>
                                        <ProductRow product={product} handleFilterProducts={handleFilterProducts} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded-md text-lg"
                >
                    Logout
                </button>
            </div>
            <ConfirmModal isOpenModal={isOpenModal} cancelAction={handleOpenModal} confirmAction={handleDeleteInactiveUsers} />
        </div>
    )
}