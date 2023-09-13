'use client'
import { useState } from "react";
import { CancelIcon, DeleteIconWhite, EditIcon, SaveIcon } from "./Icons"
import { useCookies } from "react-cookie";
import { toast } from "react-toastify"
import ConfirmModal from "./ConfirmModal";
export default function UserRow({ user , handleFilterUsers}) {
    const [editMode, setEditMode] = useState(false)
    const [selectedRole, setSelectedRole] = useState(user.role)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [cookies] = useCookies(["token"])
    const token = cookies.accessToken
    const handleDeleteUser = async () => {
        const response = await fetch(`https://sneakers-r0yz.onrender.com/session/deleteUser`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: user.email })
        })
        const res = await response.json()
        if (res.status === 'success') {
            handleFilterUsers(user)
            toast.success('User deleted successfully')
            handleOpenModal()
        }
        else {
            toast.error('Something went wrong')
        }
    }

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
    const handleSubmit = async () => {
        const data = {
            email: user.email,
            role: selectedRole
        }
        const response = await fetch(`https://sneakers-r0yz.onrender.com/api/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        if (res.status === 'success') {
            toast.success('User role updated successfully')
            toggleEditMode()
            return
        }
        toast.error('Something went wrong')
    }

    const handleSelectedMode = (e) => {
        setSelectedRole(e.target.value)
    }
    return (
        <>
            <td className="py-2 px-4">{user.firstName}</td>
            <td className="py-2 px-4">{user.lastName}</td>
            <td className="py-2 px-4">{user.username}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">
                <select
                    className="bg-gray-600 text-white py-2 px-4 rounded-md text-lg"
                    value={selectedRole}
                    disabled={!editMode}
                    onChange={handleSelectedMode}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="premium">Premium</option>
                </select>

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
            <ConfirmModal isOpenModal={isOpenModal} cancelAction={handleOpenModal} confirmAction={handleDeleteUser} />
        </>
    )
}