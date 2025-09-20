import React, { use } from 'react'
import AuthService from '../../lib/Auth'
import { logout } from '../../store/authSlice'
import {useDispatch} from 'react-redux'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        AuthService.logout().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <div onClick={handleLogout} className="cursor-pointer border p-2 rounded hover:bg-red-500"> LogoutBtn</div>
  )
}

export default LogoutBtn