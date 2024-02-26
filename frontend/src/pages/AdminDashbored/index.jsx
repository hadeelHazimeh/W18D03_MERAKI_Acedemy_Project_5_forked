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
 {isLoggedIn?<> { roleLocal==="1" ?<><div style={{height:"100vh",display:"grid",gridTemplateColumns:"0.5fr 4fr"}}>
    <AdminSideBar/>
    <div> <Outlet/></div>
       
    
    </div></>:<><Container style={{display:"flex",justifyContent:"center"}} className=" text-center  service-container" ><MDBCard  style={{maxWidth:"70rem" ,justifyContent:"center",marginTop:"30px" ,backgroundColor:"#302B2B"}} className='mb-32'>
        <MDBCardImage position='top' src='https://cdn.dribbble.com/users/959295/screenshots/2721842/404-inspiration.gif' alt='...' />
        <MDBCardBody>
          <MDBCardTitle style={{textAlign:"center",fontWeight:"bold",fontFamily:"Raleway",color:"whitesmoke"}}>Your Not Authorized to access this page </MDBCardTitle>
      
        </MDBCardBody>
      </MDBCard></Container> 
</>
    
   }</>: <> {navigate("/login")} </> }
   
    </>
  )
}

export default AdminDashboard