import React, { useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';

import AdminSideBar from '../../components/AdminSideBar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
const AdminDashboard = () => {
  const { isLoggedIn,token,role } = useSelector((state) => state.auth);
const [roleLocal, setRoleLocal] = useState(localStorage.getItem("role"))
  const navigate=useNavigate()
  return (
    <> 
 {isLoggedIn?<> { roleLocal==="1" ?<><div style={{height:"100vh",display:"grid",gridTemplateColumns:"0.2fr 4fr"}}>
    <AdminSideBar/>
    <div> <Outlet/></div>
       
    
    </div></>:<Container style={{display:"flex",justifyContent:"center" ,backgroundColor:"",}} className=" text-center" ><MDBCard  style={{maxWidth:"63rem" ,justifyContent:"center",marginTop:"30px" ,backgroundColor:"#212526",}} >
        <MDBCardImage position='top' src='https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden-CSS-Hover.gif' alt='...' />
        <MDBCardBody>
          <MDBCardTitle style={{textAlign:"center",fontWeight:"bold",fontFamily:"Raleway",color:"whitesmoke"}}>access to this page is restricted</MDBCardTitle>
      
        </MDBCardBody>
      </MDBCard></Container> 

    
   }</>: <> {navigate("/login")} </> }
   
    </>
  )
}

export default AdminDashboard