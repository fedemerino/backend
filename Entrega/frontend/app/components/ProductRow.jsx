'use client'
import { CancelIcon, DeleteIconWhite, EditIcon, SaveIcon } from './Icons'
import { useCookies } from 'react-cookie'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import ConfirmModal from './ConfirmModal'
export default function ProductRow({ product }) {

    const [editMode, setEditMode] = useState(false)
    const [productData, setProductData] = useState(product)
    const [cookies, setCookie, removeCookie] = useCookies(["token"])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const codeInputRef = useRef();
    const titleInputRef = useRef();
    const priceInputRef = useRef();
    const stockInputRef = useRef();
    const token = cookies.accessToken;

    const updateDBProduct = async (updatedProductData) => {
        const response = await fetch(`http://localhost:8080/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProductData)
        });

        const res = await response.json();
        if (res.status === 'success') {
            toast.success('Product updated successfully!')
        }
        else {
            toast.error('Something went wrong!')
        }
    };
    const handleDeleteProduct = async () => {
        const response = await fetch(`http://localhost:8080/api/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ owner: product.owner })
        })
        const res = await response.json()
        if (res.status === 'success') {
            toast.success('Product deleted successfully!')
            handleOpenModal()
            setTimeout(() => {
                window.location.reload()
            }
                , 1500)
        }
        else {
            toast.error('Something went wrong!')
        }

    }

    const handleSubmit = async () => {
        const updatedProductData = {
            code: codeInputRef.current.value,
            title: titleInputRef.current.value,
            price: priceInputRef.current.value,
            stock: stockInputRef.current.value,
        };
        setProductData(updatedProductData);
        await updateDBProduct(updatedProductData)
        setEditMode(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    return (
        <>
            <td className="py-2 px-4">
                <input
                    ref={codeInputRef}
                    className={editMode ? 'bg-gray-400 text-white py-2 px-4 rounded-md text-lg' : 'bg-gray-800 text-white py-2 px-4  text-lg cursor-not-allowed'}
                    type='text'
                    disabled={!editMode}
                    defaultValue={productData.code}
                >
                </input>
            </td>
            <td className="py-2 px-4">
                <input
                    ref={titleInputRef}
                    className={editMode ? 'bg-gray-400 text-white py-2 px-4 rounded-md text-lg' : 'bg-gray-800 text-white py-2 px-4  text-lg cursor-not-allowed'}
                    type='text'
                    disabled={!editMode}
                    defaultValue={productData.title}
                >
                </input>
            </td>
            <td className="py-2 px-4">
                <input
                    ref={priceInputRef}
                    className={editMode ? 'bg-gray-400 text-white py-2 px-4 rounded-md text-lg' : 'bg-gray-800 text-white py-2 px-4  text-lg cursor-not-allowed'}
                    type='number'
                    disabled={!editMode}
                    defaultValue={productData.price}
                >
                </input>
            </td>
            <td className="py-2 px-4">
                <input
                    ref={stockInputRef}
                    className={editMode ? 'bg-gray-400 text-white py-2 px-4 rounded-md text-lg' : 'bg-gray-800 text-white py-2 px-4  text-lg cursor-not-allowed'}
                    type='number'
                    disabled={!editMode}
                    defaultValue={productData.stock}
                >
                </input>
            </td>
            <td className="flex gap-1 py-2 px-4">
                {!editMode ? (
                    <div className='flex gap-4'>
                        <span onClick={toggleEditMode}>
                            <EditIcon />
                        </span>
                        <span onClick={handleOpenModal}>
                            <DeleteIconWhite />
                        </span>
                    </div>
                ) :
                    (
                        <div className="flex gap-2">
                            <span onClick={toggleEditMode}>
                                <CancelIcon />
                            </span>
                            <span onClick={(handleSubmit)}>
                                <SaveIcon />
                            </span>
                        </div>
                    )}
            </td>
            {
                <ConfirmModal isOpenModal={isOpenModal} confirmAction={handleDeleteProduct} cancelAction={handleOpenModal} />
            }

        </>
    )
}