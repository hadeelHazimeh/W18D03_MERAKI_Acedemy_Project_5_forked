import React, { useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const AdminDashboard = () => {
  const { isLoggedIn,token,role } = useSelector((state) => state.auth);
const [roleLocal, setRoleLocal] = useState(localStorage.getItem("role"))
  const navigate=useNavigate()
  return (
    <> 
 {isLoggedIn?<> { roleLocal==="1" ?<><div style={{height:"100vh",display:"grid",gridTemplateColumns:"0.5fr 4fr"}}>
    <AdminSideBar/>
    <div> <Outlet/></div>
       
    
    </div></>:<><p>your not an admin </p></>
    
   }</>: <> {navigate("/login")} </> }
   
    </>
  )
}

export default AdminDashboard