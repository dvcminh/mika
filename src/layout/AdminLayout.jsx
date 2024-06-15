import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden pt-16'>
        <AdminSidebar />
        <div className='p-4 overflow-x-scroll'>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout