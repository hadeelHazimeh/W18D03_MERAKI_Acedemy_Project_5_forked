import React from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  return (
    <> <div style={{height:"100vh",display:"grid",gridTemplateColumns:"0.5fr 4fr"}}>
    <AdminSideBar/>
    <div> <Outlet/></div>
       
    
    </div>
   
    </>
  )
}

export default AdminDashboard